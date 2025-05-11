import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const LowStockChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/api/low-stock')  // Replace with your actual API if different
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => {
        setChartData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ width: '75%', height: 300, margin: '40px auto 120px' }}>
      <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>Low Stock Ingredients</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 20 }} barCategoryGap="25%" barGap={8}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis type="number" />
          <YAxis dataKey="ingredient_name" type="category" />
          <Tooltip />
          <Bar dataKey="quantity" fill="#000080" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LowStockChart;
