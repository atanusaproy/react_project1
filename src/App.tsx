import React, { useEffect, useState } from 'react';
import { Container, Spinner, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductService from './Service/ProductService';
import CardProduct from './component/card/product';
import { IProducts } from './Interface/Product.interface';
import './App.css';


function App() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProducts[]>([]);
  
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || 'all';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await new ProductService().getProductList();
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...products];
      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply category filter
      if (categoryQuery && categoryQuery !== 'all') {
        filtered = filtered.filter(product => product.category.toLowerCase() === categoryQuery.toLowerCase());
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [products, searchQuery, categoryQuery]);

  const handleCategoryChange = (category: string) => {
    setSearchParams({ search: searchQuery, category: category.toLowerCase() });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchParams({ search: query, category: categoryQuery });
  };

  return (
    <div>
      {/* <AppTopBar categoriesMenu={categories} setSearchParams={setSearchParams}></AppTopBar> */}
      {/* Add top padding to avoid overlap with the fixed navbar */}
      <main style={{ paddingTop: '80px' }}>
        {loading ? (
          <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Spinner animation="border" />
          </Container>
        ) : (
          <Container>
            <Row>
              <CardProduct item={filteredProducts} categoryItem={categoryQuery} />
            </Row>
          </Container>
        )}
      </main>
    </div>
  );
}

export default App;
