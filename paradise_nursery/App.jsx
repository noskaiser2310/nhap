import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);
  return (
    <div className="landing-page">
      {!showProducts ? (
        <div>
          <h1>Paradise Nursery</h1>
          <p>Welcome to our online plant shop.</p>
          <button onClick={() => setShowProducts(true)}>Get Started</button>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}
export default App;
