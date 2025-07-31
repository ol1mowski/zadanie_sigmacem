import { Header } from './components/layout/Header.component';
import { FeaturedProducts } from './components/featuredProducts/FeaturedProducts.component';
import { NewArrivals } from './components/newArrivals/NewArrivals.component';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <FeaturedProducts />
        <NewArrivals />
      </main>
    </div>
  );
}

export default App;
