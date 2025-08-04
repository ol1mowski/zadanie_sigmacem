import { Header } from './components/layout/Header.component';
import { FeaturedProducts } from './components/featuredProducts/FeaturedProducts.component';
import { NewArrivals } from './components/newArrivals/NewArrivals.component';
import { ErrorBoundary } from './components/ui/error/errorBoundary/ErrorBoundary.component';

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <Header />
        <main className="container">
          <FeaturedProducts />
          <NewArrivals />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
