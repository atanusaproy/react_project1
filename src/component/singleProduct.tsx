import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IProducts } from '../Interface/Product.interface';
import { IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';

const SingleProduct: React.FC = () => {
    const { product_id } = useParams();
    const location = useLocation();
    const item = location.state?.res as IProducts;

    if (!item) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h5" component="div">
                    No Product Details Available
                </Typography>
            </Box>
        );
    }

    const handleAddToCart = () => {
        // Logic for adding the product to the cart
        console.log('Product added to cart:', item);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Product Details
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <IconButton color="inherit">
                            <Logout />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                    <Grid item key={`image-${item.id}`} xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardMedia
                                component="img"
                                height="100%"
                                image={item.image}
                                alt={item.title}
                            />
                        </Card>
                    </Grid>
                    <Grid item key={`details-${item.id}`} xs={12} md={6}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Rating
                                        name="read-only"
                                        value={item.rating.rate}
                                        readOnly
                                        precision={0.1}
                                        sx={{
                                            '& .MuiRating-iconFilled': {
                                                color: '#ffeb3b', // Yellow for filled stars
                                            },
                                            '& .MuiRating-iconEmpty': {
                                                color: '#c4c4c4', // Gray for empty stars
                                            },
                                        }}
                                    />
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                        {`${item.rating.rate} (${item.rating.count} reviews)`}
                                    </Typography>
                                </Box>
                                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold', mt: 2 }}>
                                    Price: ${item.price.toFixed(2)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                    Category: {item.category}
                                </Typography>
                                <Box sx={{ p: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<ShoppingCartIcon />}
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </Button>
                                </Box>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 2, mb: 2 }}>
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default SingleProduct;
