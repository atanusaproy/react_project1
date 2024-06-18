import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Spinner, Button, Form, FormControl, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductService from './Service/ProductService';
import CardProduct from './component/card/product';
import { IProducts } from './Interface/Product.interface';
import './App.css';

function App() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProducts[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || 'all';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const products = await new ProductService().getProductList();
      const categories = await new ProductService().getProductCat();

      setProducts(products);
      setFilteredProducts(products);
      setCategories(["all", ...categories]);
      setLoading(false);
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

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
              src={`${process.env.PUBLIC_URL}/a.png`} // Replace with your logo URL
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="OpenCart Logo"
            />
            <span className="ms-2">Royz</span> {/* Add margin start for spacing */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                {categories.map((category, index) => (
                  <NavDropdown.Item key={index} onClick={() => handleCategoryChange(category)}>
                    {category}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleSearchChange}
                value={searchQuery}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Add top padding to avoid overlap with the fixed navbar */}
      <Container style={{ marginTop: '70px' }}>
        <Row>
          <CardProduct item={filteredProducts} categoryItem={categoryQuery} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
