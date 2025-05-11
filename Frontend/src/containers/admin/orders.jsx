// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editData, setEditData] = useState({
//     user_id: '',
//     total: '',
//     shipping_address: '',
//     order_date: ''
//   });

//   const cellStyle = {
//     border: '1px solid #ccc',
//     padding: '10px',
//     verticalAlign: 'top',
//     minHeight: '50px'
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = () => {
//     axios.get('http://localhost:8081/api/orders')
//       .then(res => setOrders(res.data))
//       .catch(err => console.error('Error fetching orders:', err));
//   };

//   const handleEditChange = (e) => {
//     setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleEditClick = (order) => {
//     setEditingId(order.id);
//     setEditData({
//       user_id: order.user_id,
//       total: order.total,
//       shipping_address: order.shipping_address,
//       order_date: order.order_date
//     });
//   };

//   const handleCancelEdit = () => {
//     setEditingId(null);
//     setEditData({ user_id: '', total: '', shipping_address: '', order_date: '' });
//   };

//   const handleUpdate = (id) => {
//     axios.put(`http://localhost:8081/api/orders/${id}`, editData)
//       .then(() => {
//         setEditingId(null);
//         fetchOrders();
//       })
//       .catch(err => alert('Failed to update order'));
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this order?')) {
//       axios.delete(`http://localhost:8081/api/orders/${id}`)
//         .then(() => fetchOrders())
//         .catch(err => alert('Failed to delete order'));
//     }
//   };

//   return (
//     <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
//       <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy'   }}>Order Management</h1>

//       <table style={{
//         width: '100%',
//         borderCollapse: 'collapse',
//         boxShadow: '0 0 10px rgba(0,0,0,0.1)'
//       }}>
//         <thead style={{ backgroundColor: '#f0f0f0' }}>
//           <tr>
//             {['User ID', 'Total', 'Shipping Address', 'Order Date', 'Actions'].map(col => (
//               <th
//                 key={col}
//                 style={{
//                   border: '1px solid #ccc',
//                   padding: '12px',
//                   textAlign: 'left',
//                   fontWeight: 'bold'
//                 }}
//               >
//                 {col}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order, idx) => (
//             <tr key={order.id} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
//               {editingId === order.id ? (
//                 <>
//                   <td style={cellStyle}>
//                     <input name="user_id" value={editData.user_id} onChange={handleEditChange} />
//                   </td>
//                   <td style={cellStyle}>
//                     <input name="total" value={editData.total} onChange={handleEditChange} />
//                   </td>
//                   <td style={cellStyle}>
//                     <input name="shipping_address" value={editData.shipping_address} onChange={handleEditChange} />
//                   </td>
//                   <td style={cellStyle}>
//                     <input name="order_date" value={editData.order_date} onChange={handleEditChange} />
//                   </td>
//                   <td style={cellStyle}>
//                     <button onClick={() => handleUpdate(order.id)}>Save</button>
//                     <button onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancel</button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td style={cellStyle}>{order.user_id}</td>
//                   <td style={cellStyle}>{order.total}</td>
//                   <td style={cellStyle}>{order.shipping_address}</td>
//                   <td style={cellStyle}>{order.order_date}</td>
//                   <td style={cellStyle}>
//                     <button onClick={() => handleEditClick(order)}>Edit</button>
//                     <button onClick={() => handleDelete(order.id)} style={{ marginLeft: '10px' }}>Delete</button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminOrders;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    user_id: '',
    total: '',
    shipping_address: '',
    order_date: ''
  });

  const [orderItems, setOrderItems] = useState([]);
  const [viewingOrderId, setViewingOrderId] = useState(null);

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    verticalAlign: 'top',
    minHeight: '50px'
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:8081/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error fetching orders:', err));
  };

  const fetchOrderItems = (orderId) => {
    axios.get(`http://localhost:8081/api/orders/${orderId}/items`)
      .then(res => {
        setOrderItems(res.data);
        setViewingOrderId(orderId);
      })
      .catch(err => alert('Failed to load order items'));
  };

  const handleEditChange = (e) => {
    setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditClick = (order) => {
    setEditingId(order.id);
    setEditData({
      user_id: order.user_id,
      total: order.total,
      shipping_address: order.shipping_address,
      order_date: order.order_date
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({ user_id: '', total: '', shipping_address: '', order_date: '' });
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:8081/api/orders/${id}`, editData)
      .then(() => {
        setEditingId(null);
        fetchOrders();
      })
      .catch(err => alert('Failed to update order'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      axios.delete(`http://localhost:8081/api/orders/${id}`)
        .then(() => fetchOrders())
        .catch(err => alert('Failed to delete order'));
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy' }}>Order Management</h1>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            {['User ID', 'Total', 'Shipping Address', 'Order Date', 'Actions'].map(col => (
              <th
                key={col}
                style={{
                  border: '1px solid #ccc',
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: 'bold'
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order.id} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              {editingId === order.id ? (
                <>
                  <td style={cellStyle}>
                    <input name="user_id" value={editData.user_id} onChange={handleEditChange} />
                  </td>
                  <td style={cellStyle}>
                    <input name="total" value={editData.total} onChange={handleEditChange} />
                  </td>
                  <td style={cellStyle}>
                    <input name="shipping_address" value={editData.shipping_address} onChange={handleEditChange} />
                  </td>
                  <td style={cellStyle}>
                    <input name="order_date" value={editData.order_date} onChange={handleEditChange} />
                  </td>
                  <td style={cellStyle}>
                    <button onClick={() => handleUpdate(order.id)}>Save</button>
                    <button onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={cellStyle}>{order.user_id}</td>
                  <td style={cellStyle}>{order.total}</td>
                  <td style={cellStyle}>{order.shipping_address}</td>
                  <td style={cellStyle}>{order.order_date}</td>
                  {/* <td style={cellStyle}>
                    <button onClick={() => handleEditClick(order)}>Edit</button>
                    <button onClick={() => handleDelete(order.id)} style={{ marginLeft: '10px' }}> |  Delete</button>
                    <button onClick={() => fetchOrderItems(order.id)} style={{ marginLeft: '10px' }}>
                    |   View Details
                    </button>
                  </td> */}

                  <td style={cellStyle}>
  <button
    onClick={() => handleEditClick(order)}
    style={{
      marginLeft: '10px',
      backgroundColor: 'transparent',
      color: '#007bff',
      border: 'none',
      borderRadius: '4px',
      padding: '5px 10px',
      cursor: 'pointer',
      transition: 'color 0.3s'
    }}
    onMouseOver={(e) => e.target.style.color = '#0056b3'}
    onMouseOut={(e) => e.target.style.color = '#007bff'}
  >
    Edit
  </button>
  <span style={{ marginLeft: '10px', color: 'black' }}> | </span>
  <button
    onClick={() => handleDelete(order.id)}
    style={{
      marginLeft: '10px',
      backgroundColor: 'transparent',
      color: '#dc3545',
      border: 'none',
      borderRadius: '4px',
      padding: '5px 10px',
      cursor: 'pointer',
      transition: 'color 0.3s'
    }}
    onMouseOver={(e) => e.target.style.color = '#c82333'}
    onMouseOut={(e) => e.target.style.color = '#dc3545'}
  >
    Delete
  </button>
  <span style={{ marginLeft: '10px', color: 'black' }}> | </span>
  <button
    onClick={() => fetchOrderItems(order.id)}
    style={{
      marginLeft: '10px',
      backgroundColor: 'transparent',
      color: '#007bff',
      border: 'none',
      borderRadius: '4px',
      padding: '5px 10px',
      cursor: 'pointer',
      transition: 'color 0.3s'
    }}
    onMouseOver={(e) => e.target.style.color = '#0056b3'}
    onMouseOut={(e) => e.target.style.color = '#007bff'}
  >
    View Details
  </button>
</td>


                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {viewingOrderId && (
        <div style={{ marginTop: '30px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <h3>Order Details (Order ID: {viewingOrderId})</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={cellStyle}>Ingredient ID</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Quantity</th>
                <th style={cellStyle}>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, idx) => (
                <tr key={idx}>
                  <td style={cellStyle}>{item.ingredient_id}</td>
                  <td style={cellStyle}>{item.ingredient_name}</td>
                  <td style={cellStyle}>{item.quantity}</td>
                  <td style={cellStyle}>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setViewingOrderId(null)} style={{ marginTop: '10px' }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
