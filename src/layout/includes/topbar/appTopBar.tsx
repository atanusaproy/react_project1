import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import ProductService from '../../../Service/ProductService';
import './appTopBar.css';
import TopBarCart from './topbar.cart';
import { IProducts } from '../../../Interface/Product.interface';
import Autocomplete from '@mui/material/Autocomplete';
import { parseJsonText } from 'typescript';
import SearchAutoComplete from './searchAutoComplete';

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
    menuName: 'New Page',
    link: '/new-page',
  },
];

const AppTopBar: React.FC<IProps> = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [showForm, setShowForm] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [productList, setProductList] = useState<IProducts[]>([]);
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

    if (pathname !== '/' && pathname !== '') {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
    const fetchProductList = async () => {
      try {
        const productList = await new ProductService().getProductList();
        console.log(productList);
        setProductList([...productList]);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProductList();

  }, [pathname]); // Remove unnecessary dependencies and ensure pathname is correctly checked

  const navigateToHome = ((searchQuery: string, category: string) => {
    if (pathname !== '/' && pathname !== '') {
      navigate({
        pathname: '/',
        search: `?search=${searchQuery}&category=${category.toLowerCase()}`
      });
    }
  });

  const handleCategoryChange = (category: string) => {
    setSearchParams({ search: searchQuery, category: category.toLowerCase() });
    navigateToHome(searchQuery, category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchParams({ search: query, category: categoryQuery });
    navigateToHome(query, categoryQuery);
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
            {showForm ? (
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
            )
              :
              (
                <SearchAutoComplete />
              )
            }
            <Nav className="ms-auto">
              {/* Cart Item */}

            </Nav>
          </Navbar.Collapse>
          <TopBarCart />
          <div style={{ marginRight: 30 }} />
          <Nav.Link as={Link} to="#">
            <AccountCircle className="nav-icon" fontSize="large" />
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
}

export default AppTopBar;
