// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminCarts = () => {
//   const [carts, setCarts] = useState([]);

//   const cellStyle = {
//     border: '1px solid #ccc',
//     padding: '10px',
//     verticalAlign: 'top',
//     minHeight: '50px'
//   };

//   useEffect(() => {
//     fetchCarts();
//   }, []);

//   const fetchCarts = () => {
//     axios.get('http://localhost:8081/api/carts')
//       .then(res => setCarts(res.data))
//       .catch(err => console.error('Error fetching carts:', err));
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this cart?')) {
//       axios.delete(`http://localhost:8081/api/carts/${id}`)
//         .then(() => fetchCarts())
//         .catch(err => alert('Failed to delete cart'));
//     }
//   };

//   return (
//     <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
//       <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy' }}>Cart Management</h1>

//       <table style={{
//         width: '100%',
//         borderCollapse: 'collapse',
//         boxShadow: '0 0 10px rgba(0,0,0,0.1)'
//       }}>
//         <thead style={{ backgroundColor: '#f0f0f0' }}>
//           <tr>
//             {['User ID', 'Ingredient ID', 'Quantity', 'Created At', 'Actions'].map(col => (
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
//           {carts.map((cart, idx) => (
//             <tr key={cart.id} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
//               <td style={cellStyle}>{cart.user_id}</td>
//               <td style={cellStyle}>{cart.ingredient_id}</td>
//               <td style={cellStyle}>{cart.quantity}</td>
//               <td style={cellStyle}>{cart.created_at}</td>
//               <td style={cellStyle}>
//                 <button 
//                   onClick={() => handleDelete(cart.id)} 
//                   style={{
//                     padding: '5px 10px',
//                     color: 'white',
//                     backgroundColor: '#d9534f',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminCarts;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCarts = () => {
  const [carts, setCarts] = useState([]);

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    verticalAlign: 'top',
    minHeight: '50px'
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = () => {
    axios.get('http://localhost:8081/api/carts')
      .then(res => setCarts(res.data))
      .catch(err => console.error('Error fetching carts:', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this cart?')) {
      axios.delete(`http://localhost:8081/api/carts/${id}`)
        .then(() => fetchCarts())
        .catch(err => alert('Failed to delete cart'));
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy' }}>Cart Management</h1>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            {['User ID', 'Ingredient Name', 'Quantity', 'Created At', 'Actions'].map(col => (
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
          {carts.map((cart, idx) => (
            <tr key={cart.id} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              <td style={cellStyle}>{cart.user_id}</td>
              <td style={cellStyle}>{cart.ingredient_name}</td>
              <td style={cellStyle}>{cart.quantity}</td>
              <td style={cellStyle}>{cart.created_at}</td>
              <td style={cellStyle}>
                <button 
                  onClick={() => handleDelete(cart.id)} 
                  style={{
                    padding: '5px 10px',
                    color: 'white',
                    backgroundColor: '#d9534f',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCarts;
