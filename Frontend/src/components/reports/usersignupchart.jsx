import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Format date to display in a readable format
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const UserSignupsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/api/user-signups')  // Update this API endpoint accordingly
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        // Format the data to be used in the chart
        const formattedData = data.map(item => ({
          signup_date: formatDate(item.signup_date),
          user_count: item.user_count,
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    // <div style={{ width: '100%', height: 400 }}>
    //   <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>User Signups</h3>
    //   <ResponsiveContainer width="100%" height="100%">
    //     <LineChart data={chartData}>
    //       <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
    //       <XAxis dataKey="signup_date" />
    //       <YAxis />
    //       <Tooltip />
    //       <Line type="monotone" dataKey="user_count" stroke="#8884d8" strokeWidth={3} />
    //     </LineChart>
    //   </ResponsiveContainer>
    // </div>

    <div style={{ width: '80%', height: 300,  margin: '0 auto 120px' }}>
      <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>User Signups</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="signup_date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="user_count" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserSignupsChart;
