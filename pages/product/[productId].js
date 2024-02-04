import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const ProductDetailPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        // DummyJSON API for product detail
        const response = await fetch(`https://dummyapi.io/data/api/product/${productId}`, {
          headers: {
            'app-id': 'your-dummyjson-app-id', // Replace with your DummyJSON App ID
          },
        });

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  return (
    <div>
      <h1>Product Detail</h1>
      {product ? (
        <div>
          <h1>Name: {product.name}</h1>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
