import { useParams } from 'react-router-dom';
import { products } from '../utils/mockData';
import ProductCard from '../components/ui/ProductCard';

export default function CategoryPage() {
  const { id } = useParams();
  const catProducts = products.filter(p => p.category === id);

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center uppercase dark:text-white mb-10">{id} Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {catProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}