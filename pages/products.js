import { useState, useEffect } from 'react';
import Link from 'next/link';


const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // DummyJSON API for product list with pagination
        const response = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${(currentPage - 1) * productsPerPage}`, {
          headers: {
            // 'app-id': 'your-dummyjson-app-id', // Replace with your DummyJSON App ID
          },
        });

        
        

        const data = await response.json();
        console.log("data",data);
        setProducts(data?.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  

  return (
    <div className='container mx-auto p-4'>
      <div style={{textAlign:'center', maxWidth: '400px', margin:'auto'}}>
        <h1 className="text-3xl font-bold mb-4">Products</h1>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((products) => (
          <li key={products.id} className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">{products.title}</h2>
            <p className="text-gray-600  mb-4">{products.description}</p>
            {/* <p>{products.images}</p> */}
            {products.images && products.images.length >0 &&(
              <div>
                <p className="font-semibold mb-2">Images:</p>
                <img src={products.images[0]} alt={'product ${productd.id}'}className="max-w-full h-auto rounded-md" />
                {/* <ul className="flex">
                  {products.images.map((image, index) => (
                    <li key={index} className="mr-2">
                      <img src={image} alt={'products ${index +1}'} className="max-w-full h-auto" />
                    </li>
                  ))}
                </ul> */}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div style={{textAlign:'center', maxWidth: '400px', margin:'auto'}}>
        <button onClick={() => setCurrentPage((prevPage) => prevPage - 1)} disabled={currentPage === 1} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Previous
        </button>
        <span className="text-xl font-semibold">Page {currentPage}</span>
        <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Next</button>
      </div>
    </div>
  );
};

export default ProductsPage;
