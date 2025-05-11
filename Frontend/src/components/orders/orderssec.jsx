

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserOrderDetails = () => {
//   const [orders, setOrders] = useState([]);
//   const storedUser = JSON.parse(localStorage.getItem('user'));
//   const userId = storedUser?.id;

//   useEffect(() => {
//     if (userId) {
//       axios.get(`http://localhost:8081/orders/${userId}`)
//         .then(res => setOrders(res.data))
//         .catch(err => console.error("Error:", err));
//     }
//   }, [userId]);

//   const groupedOrders = orders.reduce((acc, row) => {
//     if (!acc[row.order_id]) acc[row.order_id] = { ...row, items: [] };
//     acc[row.order_id].items.push({
//       name: row.ingredient_name,
//       unit: row.unit,
//       quantity: row.quantity,
//       price: row.price,
//     });
//     return acc;
//   }, {});

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>

//       {Object.values(groupedOrders).map(order => (
//         <div
//           key={order.order_id}
//           className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-semibold">
//               Order #{order.order_id}
//             </h3>
//             <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
//               {order.status}
//             </span>
//           </div>

//           <p className="text-sm text-gray-600">
//             <strong>Total:</strong> ${order.total.toFixed(2)}
//           </p>
//           <p className="text-sm text-gray-600">
//             <strong>Shipping:</strong> {order.shipping_address}
//           </p>
//           <p className="text-sm text-gray-600 mb-4">
//             <strong>Order Date:</strong>{' '}
//             {new Date(order.order_date).toLocaleString()}
//           </p>

//           <div className="overflow-x-auto">
//             <table className="w-full table-auto text-sm text-left border-t border-gray-200">
//               <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
//                 <tr>
//                   <th className="px-4 py-2 border-b">Ingredient</th>
//                   <th className="px-4 py-2 border-b">Quantity</th>
//                   <th className="px-4 py-2 border-b">Unit</th>
//                   <th className="px-4 py-2 border-b">Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.items.map((item, idx) => (
//                   <tr key={idx} className="hover:bg-gray-50">
//                     <td className="px-4 py-2">{item.name}</td>
//                     <td className="px-4 py-2">{item.quantity}</td>
//                     <td className="px-4 py-2">{item.unit}</td>
//                     <td className="px-4 py-2">${item.price.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserOrderDetails;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8081/orders/${userId}`)
        .then(res => setOrders(res.data))
        .catch(err => console.error("Error:", err));
    }
  }, [userId]);

  const handleCancel = (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (confirmCancel) {
      axios.delete(`http://localhost:8081/orders/${orderId}`)
        .then(() => {
          // Remove cancelled order from state
          setOrders(prev => prev.filter(order => order.order_id !== orderId));
        })
        .catch(err => console.error("Cancel Error:", err));
    }
  };

  const groupedOrders = orders.reduce((acc, row) => {
    if (!acc[row.order_id]) acc[row.order_id] = { ...row, items: [] };
    acc[row.order_id].items.push({
      name: row.ingredient_name,
      unit: row.unit,
      quantity: row.quantity,
      price: row.price,
    });
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>

      {Object.values(groupedOrders).map(order => (
        <div
          key={order.order_id}
          className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Order #{order.order_id}
              </h3>
              <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                {order.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Shipping:</strong> {order.shipping_address}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Order Date:</strong>{' '}
              {new Date(order.order_date).toLocaleString()}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm text-left border-t border-gray-200">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2 border-b">Ingredient</th>
                    <th className="px-4 py-2 border-b">Quantity</th>
                    <th className="px-4 py-2 border-b">Unit</th>
                    <th className="px-4 py-2 border-b">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">{item.unit}</td>
                      <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleCancel(order.order_id)}
              style={{
                backgroundColor: '#ff4d4f',
                color: 'white',
                border: 'none',
                padding: '5px 12px',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
            >
              Cancel Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrderDetails;
