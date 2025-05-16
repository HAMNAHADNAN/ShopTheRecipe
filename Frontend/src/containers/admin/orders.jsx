


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
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  
  // New state to handle delete confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

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
      .catch(err => {
        setMessage('Error fetching orders');
        setMessageType('error');
      });
  };

  const fetchOrderItems = (orderId) => {
    axios.get(`http://localhost:8081/api/orders/${orderId}/items`)
      .then(res => {
        setOrderItems(res.data);
        setViewingOrderId(orderId);
        setMessage(null);
      })
      .catch(() => {
        setMessage('Failed to load order items');
        setMessageType('error');
      });
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
    setMessage(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({ user_id: '', total: '', shipping_address: '', order_date: '' });
    setMessage(null);
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:8081/api/orders/${id}`, editData)
      .then(() => {
        setEditingId(null);
        fetchOrders();
        setMessage('Order updated successfully');
        setMessageType('success');
      })
      .catch(() => {
        setMessage('Failed to update order');
        setMessageType('error');
      });
  };

  // Instead of deleting immediately, show confirmation UI
  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  // Actual delete after confirmation
  const confirmDelete = () => {
    axios.delete(`http://localhost:8081/api/orders/${confirmDeleteId}`)
      .then(() => {
        fetchOrders();
        setMessage('Order deleted successfully');
        setMessageType('success');
        if (viewingOrderId === confirmDeleteId) setViewingOrderId(null);
        setConfirmDeleteId(null);
      })
      .catch(() => {
        setMessage('Failed to delete order');
        setMessageType('error');
        setConfirmDeleteId(null);
      });
  };

  // Cancel delete confirmation
  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '99%', margin: '0 auto', position: 'relative' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '40px', color: 'navy' }}>Order Management</h1>

      {message && (
        <div
          style={{
            marginBottom: '20px',
            padding: '15px',
            borderRadius: '6px',
            color: messageType === 'error' ? '#721c24' : '#155724',
            backgroundColor: messageType === 'error' ? '#f8d7da' : '#d4edda',
            border: `1px solid ${messageType === 'error' ? '#f5c6cb' : '#c3e6cb'}`,
            fontWeight: 'bold',
            textAlign: 'center',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          {message}
        </div>
      )}

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
                      onClick={() => handleDeleteClick(order.id)}
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

      {/* Confirmation dialog */}
      {confirmDeleteId !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center',
            minWidth: '320px',
            boxShadow: '0 0 15px rgba(0,0,0,0.3)'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>
              Are you sure you want to delete this order?
            </p>
            <button
              onClick={confirmDelete}
              style={{
                marginRight: '15px',
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Yes
            </button>
            <button
              onClick={cancelDelete}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              No
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrders;
