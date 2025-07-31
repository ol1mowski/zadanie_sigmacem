import { useState } from 'react';
import { Header } from './components/layout/Header.component';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Header />
      <main className="container">
        <div className="hero">
          <h1 className="hero-title">Welcome to ShopOnline</h1>
          <p className="hero-subtitle">
            Your one-stop shop for everything you need
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => setCount(count => count + 1)}
            >
              count is {count}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
