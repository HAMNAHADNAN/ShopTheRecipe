import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  // Format as YYYY-MM-DD, which is well sorted and readable
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`; // Corrected string interpolation
};

const OrdersByDayChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  fetch('http://localhost:8081/api/orders-by-day')
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      // Check if the response is JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return res.text().then(text => {
          throw new Error(`Expected JSON response, but got: ${text}`);
        });
      }
      return res.json();
    })
    .then((data) => {
      const formattedData = data.map(item => ({
        order_date: formatDate(item.order_date),
        order_count: item.order_count,
      }));
      setChartData(formattedData);
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message || 'Error fetching chart data');
      setLoading(false);
    });
}, []);

  if (loading) {
    return (
      <div style={{ width: '100%', height: 400 }}>
        <h3>Orders by Day</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: '100%', height: 400 }}>
        <h3>Orders by Day</h3>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
      <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>Orders by Day</h3>
      <ResponsiveContainer width="100%" height={300}> {/* Adjust the height here */}
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="order_date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="order_count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersByDayChart;


// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// const OrdersByDayChart = () => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:8081/api/orders-by-day')
//       .then((res) => {
//         if (!res.ok) throw new Error('Network response was not ok');
//         return res.json();
//       })
//       .then((data) => {
//         // Format the data for the chart
//         const formattedData = data.map(item => ({
//           order_date: item.order_date,
//           order_count: item.order_count,
//         }));

//         setChartData(formattedData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message || 'Error fetching chart data');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div style={{ textAlign: 'center', padding: '20px' }}><h3>Loading...</h3></div>;
//   }

//   if (error) {
//     return <div style={{ textAlign: 'center', padding: '20px' }}><h3 style={{ color: 'red' }}>Error: {error}</h3></div>;
//   }

//   return (
//     <div style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
//       <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>Orders by Day</h3>
//       <ResponsiveContainer width="100%" height={300}> {/* Adjust the height here */}
//         <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
//           <XAxis dataKey="order_date" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="order_count" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default OrdersByDayChart;
