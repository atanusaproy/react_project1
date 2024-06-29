import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Offcanvas, Button, Form, FormControl, NavDropdown, Spinner } from 'react-bootstrap';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { IProducts } from '../../Interface/Product.interface';
import ProductService from '../../Service/ProductService';

interface IProps {
  categoriesMenu?: string[] | [];
  setSearchParams?: any;
}


const pages = [
  {
    menuName: 'Products',
    link: '/',
  },
  {
    menuName: 'Pricing',
    link: '/pricing',
  },
  {
    menuName: 'Blog',
    link: '/blog',
  },
];

const AppTopBar: React.FC<IProps> = () => {

  const location = useLocation();
  const pathname = location.pathname;
  const [showForm, setShowForm] = useState(true);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const categories = await new ProductService().getProductCat();
        setCategories(["all", ...categories]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    if (pathname !== '/' || '') {
      setShowForm(false);
    }else{
      setShowForm(true);
    }

  }, [showForm, categories])

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || 'all';

  const handleToggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const handleCategoryChange = (category: string) => {
    setSearchParams({ search: searchQuery, category: category.toLowerCase() });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchParams({ search: query, category: categoryQuery });
  };

  return (  
    <> 
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Link to={'/'}>
            <img
              src={`${process.env.PUBLIC_URL}/a.png`} // Replace with your logo URL
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="OpenCart Logo"
            />

          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title={categoryQuery === 'all' ? "Categories" : categoryQuery} id="basic-nav-dropdown">
                {categories && categories.map((category, index) => (
                  <NavDropdown.Item key={index} onClick={() => handleCategoryChange(category)}>
                    {category}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              {
                pages && pages.map((res, i) => (
                  <Nav.Link href={res.link} key={i}>
                    {res.menuName}
                  </Nav.Link>
                ))
              }
            </Nav>
            {showForm && (
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
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppTopBar;
