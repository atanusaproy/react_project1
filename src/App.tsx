// App.js

import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CardProduct from './component/card/product';
import ProductService from './Service/ProductService';
import { IProductCategory, IProducts } from './Interface/Product.interface';
import { CircularProgress, Box, Button, TextField, InputAdornment } from '@mui/material';
import { Logout } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';



function App() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [allProducts, setAllProducts] = useState<IProducts[]>([]);
  const [allGlobalProducts, setAllGlobalProducts] = useState<IProducts[]>([]);
  const [allCategorys, setAllCategorys] = useState<string[]>([]);
  const [menuCate, setMenuCate] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryParams, setCategoryParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      let products = await new ProductService().getProductList();
      // console.log('From app com', products);
      setAllProducts(products);
      setAllGlobalProducts(products);

    }
    getProducts()

    const getCategorys = async () => {
      let categorys = await new ProductService().getProductCat();
      // console.log('Product Category', categorys);
      const updatedCategories = ["all", ...categorys];
      setAllCategorys(updatedCategories);
      setLoading(false);
    }
    getCategorys()


  }, []);

  const handleMenu = (val: any) => {
    const category = val.toLowerCase();

    setParams(category, 'category');
    setMenuCate(category);
    // console.log(category);

    if (category !== 'all') {
      const filtered = allGlobalProducts.filter(product =>
        product.category
          .toLowerCase().includes(category)
      );
      setAllProducts(filtered);
    } else {
      setAllProducts(allGlobalProducts);
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setParams(query, 'search')
    setAllProducts(allGlobalProducts);
    if (query) {
      const filtered = allGlobalProducts.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
      setAllProducts(filtered);
    } else {
      setAllProducts(allGlobalProducts);
    }
  };

  const setParams = (filterText: string, type: 'category' | 'search') => {
    setSearchParams({
      search: type === 'search' ? filterText : searchQuery ?? '',
      category: type === 'category' ? filterText : categoryQuery ?? ''
    })
  }


  const filter = () => {
    // Apply search query from URL if present
    let _allProducts = [...allProducts];
    console.log(searchQuery, allGlobalProducts);
    if (searchQuery !== '') {
      _allProducts = allGlobalProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
      );
    }

    return _allProducts;
  }


  // const filterProduct = () => { 
  //   let _allProducts = allProducts ? [...allProducts] : []; 
  //   if (!categoryQuery) {
  //     _allProducts = allProducts ? [...allProducts] : [];
  //   } else {
  //     if (categoryQuery !== "all") {
  //       _allProducts = _allProducts.filter(
  //         (each) => each.category === categoryQuery
  //       );
  //     } else { 
  //       _allProducts = allProducts ? [...allProducts] : [];
  //     }
  //   }

  //   if (searchQuery && searchQuery !== '') {
  //     _allProducts = allProducts.filter((product) =>
  //       product.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }
  //   return _allProducts;
  // };


  if (loading) {
    return (
      <>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >

            {allCategorys.map((res, i) => (
              <MenuItem key={i} onClick={() => handleMenu(res)}>{res}</MenuItem>
            ))}

          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>

          {/* Search Bar */}
          <TextField
            variant="outlined"
            placeholder="Search…"
            size="small"
            sx={{ mx: 2, backgroundColor: 'white', borderRadius: 1 }}
            onChange={handleSearchChange}
            value={searchQuery}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Home Link */}
          <Button color="inherit">Home</Button>

          {/* Logout Button */}
          <IconButton color="inherit">
            <Logout />
          </IconButton>
        </Toolbar>

      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>

          <CardProduct item={filter()} categoryItem={menuCate} />

        </Grid>
      </Container>
    </div>
  );
}

export default App;
