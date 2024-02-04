import { useState, useEffect } from 'react';
import Link from 'next/link';
import PieChart from './components/PieChart';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [productDistribution, setProductDistribution] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // DummyJSON API for product categories
        const response = await fetch('https://dummyapi.io/data/api/category', {
          headers: {
            'app-id': 'your-dummyjson-app-id', // Replace with your DummyJSON App ID
          },
        });

        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchCategoryProducts = async (categoryId) => {
    try {
      // DummyJSON API for products in a specific category
      const response = await fetch(`https://dummyapi.io/data/api/product?category=${categoryId}`, {
        headers: {
          'app-id': 'your-dummyjson-app-id', // Replace with your DummyJSON App ID
        },
      });

      const data = await response.json();
      setCategoryProducts(data.data);

      // Calculate product distribution by category
      const distribution = {};
      data.data.forEach((product) => {
        const productCategory = product.category;
        distribution[productCategory] = (distribution[productCategory] || 0) + 1;
      });
      setProductDistribution(distribution);

      setSelectedCategory(categoryId);
    } catch (error) {
      console.error('Error fetching category products:', error);
    }
  };

  return (
    <div>
      <h1>Product Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => fetchCategoryProducts(category.id)}>
            <Link href={`/categories/${category.id}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <div>
          <h2>Products in {selectedCategory}</h2>
          <ul>
            {categoryProducts.map((product) => (
              <li key={product.id}>
                <p>Name: {product.name}</p>
                <p>Description: {product.description}</p>
              </li>
            ))}
          </ul>
          <h2>Product Distribution</h2>
          <PieChart data={productDistribution} />
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
