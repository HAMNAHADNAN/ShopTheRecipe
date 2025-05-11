// import React, { useEffect, useState } from 'react';
// import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

// const TopIngredientsPieChart = () => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

// useEffect(() => {
//   fetch('http://localhost:8081/api/top-products')
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       return res.json();
//     })
//     .then((data) => {
//       setChartData(data);
//       setLoading(false);
//     })
//     .catch((error) => {
//       setError(`Failed to fetch data: ${error.message}`);
//       setLoading(false);
//     });
// }, []);


//   if (loading) {
//     return <div style={{ textAlign: 'center', padding: '20px' }}><h3>Loading...</h3></div>;
//   }

//   if (error) {
//     return <div style={{ textAlign: 'center', padding: '20px' }}><h3 style={{ color: 'red' }}>Error: {error}</h3></div>;
//   }

//   // Random colors for pie slices
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000', '#8E44AD', '#2ECC71', '#3498DB', '#F39C12', '#D35400'];

//   return (
//     <div style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
//       <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>Top Ordered Ingredients</h3>
//       <ResponsiveContainer width="100%" height={400}>
//         <PieChart>
//           <Pie
//             data={chartData}
//             dataKey="total_quantity"
//             nameKey="ingredient_name"
//             cx="50%"
//             cy="50%"
//             outerRadius={120}
//             fill="#8884d8"
//             label
//           >
//             {chartData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TopIngredientsPieChart;



import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const TopIngredientsPieChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/api/top-products')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setChartData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || 'Error fetching chart data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}><h3>Loading...</h3></div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px' }}><h3 style={{ color: 'red' }}>Error: {error}</h3></div>;
  }

  // Random colors for pie slices
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000', '#8E44AD', '#2ECC71', '#3498DB', '#F39C12', '#D35400'];

  return (
    <div>
    <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>Top Ordered Ingredients</h3>

    <div style={{ width: '80%', margin: '0 auto', padding: '20px', display: 'flex' }}>

      <div style={{ width: '70%' }}>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="total_quantity"
              nameKey="ingredient_name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      
      
      <div style={{ width: '30%', padding: '10px' }}>
        <h4 style={{ padding: '15px' }}><b>Ingredients Key: </b></h4>
        
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {chartData.map((entry, index) => (
            <li key={`legend-item-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{
                width: '15px', height: '15px', backgroundColor: COLORS[index % COLORS.length],
                marginRight: '10px', borderRadius: '50%'
              }}></div>
              <span>{entry.ingredient_name} - {entry.total_quantity}</span>
            </li>
          ))}
        </ul>
      </div>
    
    </div>
    </div>
  );
};

export default TopIngredientsPieChart;
