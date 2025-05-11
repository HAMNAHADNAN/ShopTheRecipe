// import { useLocation } from 'react-router-dom';

// const SearchResultSec = () => {
//   const queryParams = new URLSearchParams(useLocation().search);
//   const query = queryParams.get('q');

//   return (
//     <div>
//       <h2>Results for: "{query}"</h2>
//       {/* Render results based on query */}
//     </div>
//   );
// };


// export default SearchResultSec;


import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Example dummy content; replace this with real data if available
const contentData = [
  { id: 1, title: 'React Basics', description: 'Learn how React works.' },
  { id: 2, title: 'Search Component Guide', description: 'Implement search in your React app.' },
  { id: 3, title: 'Routing in React', description: 'Understanding React Router.' },
  { id: 4, title: 'Contact Us', description: 'Reach out through our contact form.' },
];

const SearchResultSec = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const query = queryParams.get('q')?.toLowerCase() || '';
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const results = contentData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
    setFilteredResults(results);
  }, [query]);

  return (
    <div className="search-results-container">
      <h2>Search Results for: "{query}"</h2>
      {filteredResults.length > 0 ? (
        <ul className="results-list">
          {filteredResults.map(item => (
            <li key={item.id} className="result-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResultSec;
