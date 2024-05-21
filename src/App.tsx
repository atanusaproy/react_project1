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
import { log } from 'console';

function App() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [allProducts, setAllProducts] = useState<IProducts[]>([]);
  const [allCategorys, setAllCategorys] = useState<string[]>([]);
  const [menuCate, setMenuCate] = useState<string[]>([]);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getProducts = async () => {
      let products = await new ProductService().getProductList();
      console.log('From app com', products);
      setAllProducts(products)
    }
    getProducts()

    const getCategorys = async () => {
      let categorys = await new ProductService().getProductCat();
      console.log('Product Category', categorys);
      setAllCategorys(categorys)
    }
    getCategorys()
  }, []);

  const handleMenu = (val:any) => {
    setMenuCate(val)
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

            {allCategorys.map(res => (
               <MenuItem onClick={() => handleMenu(res)}>{res}</MenuItem>
            ))}

          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>

          <CardProduct item={allProducts} categoryItem={menuCate} />

        </Grid>
      </Container>
    </div>
  );
}

export default App;
