import { Header } from './components/layout/Header.component';
import { FeaturedProducts } from './components/featuredProducts/FeaturedProducts.component';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <FeaturedProducts />
      </main>
    </div>
  );
}

export default App;
