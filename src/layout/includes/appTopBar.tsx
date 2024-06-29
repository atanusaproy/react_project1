import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import ProductService from '../../Service/ProductService';
import './appTopBar.css';

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
  const [categories, setCategories] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || 'all';
  const navigate = useNavigate(); // Correctly use the useNavigate hook inside the component

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

    // if (pathname !== '/' && pathname !== '') {
    //   setShowForm(false);
    // } else {
    //   setShowForm(true);
    // }
  }, [pathname]); // Remove unnecessary dependencies and ensure pathname is correctly checked

  const navigateToHome = ((category: string, searchQuery: string) => {
    if (pathname !== '/' && pathname !== '') {
      navigate({
        pathname: '/',
        search: `?search=${searchQuery}&category=${category.toLowerCase()}`
      });
    }
  });

  const handleCategoryChange = (category: string) => {
    setSearchParams({ search: searchQuery, category: category.toLowerCase() });
    navigateToHome(category, searchQuery);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchParams({ search: query, category: categoryQuery });
    navigateToHome(categoryQuery, query);
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

              {pages && pages.map((res, i) => (
                <Nav.Link as={Link} to={res.link} key={i}>
                  {res.menuName}
                </Nav.Link>
              ))}
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
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="#">
                <ShoppingCart className="nav-icon" fontSize="large" />
              </Nav.Link>
              <Nav.Link as={Link} to="#">
                <AccountCircle className="nav-icon" fontSize="large" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppTopBar;
