import { Layout } from './components/layout/Layout.component';
import { FeaturedProducts } from './components/featuredProducts/FeaturedProducts.component';
import { NewArrivals } from './components/newArrivals/NewArrivals.component';
import { ErrorBoundary } from './components/ui/error/errorBoundary/ErrorBoundary.component';

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <div className="container">
          <FeaturedProducts />
          <NewArrivals />
        </div>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
