import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import { IProducts } from '../../Interface/Product.interface';
import useProductCartStore from '../../store/cart.store';
import CartAction from '../cartDetails/cartItemManageAction';

interface IProd {
    item: IProducts[];
    categoryItem: string[] | string;
}

const SingleProduct: React.FC = () => {
    const { product_id } = useParams();
    const location = useLocation();
    const item = location.state?.res as IProducts;
    const { addToCart } = useProductCartStore();
    const { cartItems } = useProductCartStore();

    const isCurrentItemInCart = (productId: number) => {
        return cartItems.find(eachCartItem => eachCartItem.item_id === productId);
    }

    if (!item) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h5" component="div">
                    No Product Details Available
                </Typography>
            </Box>
        );
    }

    const handleAddToCart = (item: IProducts) => {
        // console.log('Product added to cart:', item);
        // cartItem.increaseCartItem();
        // cartItem.increaseCartTest(item);
        // console.log(cartItem.x);
        addToCart(item);

    };

    const handleBuyNow = () => {
        console.log('Proceed to buy the item');
    };

    return (
        <Container sx={{ mt: 15, boxShadow: 6 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '95%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            component="img"
                            image={item.image}
                            alt={item.title}
                            sx={{
                                objectFit: 'cover',
                                maxWidth: { md: '400px' },
                                minHeight: { md: '100px' },
                            }}
                        />
                    </Card>
                </Grid>

                {/* Product Details */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '95%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent>
                            {/* Product Title */}
                            <Typography gutterBottom variant="h5" component="div">
                                {item.title}
                            </Typography>

                            {/* Product Rating */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Rating
                                    name="read-only"
                                    value={item.rating.rate}
                                    readOnly
                                    precision={0.1}
                                    sx={{
                                        '& .MuiRating-iconFilled': { color: '#ffeb3b' }, // Yellow for filled stars
                                        '& .MuiRating-iconEmpty': { color: '#c4c4c4' }, // Gray for empty stars
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                    {`${item.rating.rate} (${item.rating.count} reviews)`}
                                </Typography>
                            </Box>

                            {/* Product Price */}
                            <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold', mt: 2 }}>
                                Price: ${item.price.toFixed(2)}
                            </Typography>

                            {/* Product Category */}
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                Category: {item.category}
                            </Typography>

                            {/* Action Buttons */}
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={12} sm={6}>
                                    {isCurrentItemInCart(item.id) ? (
                                        <CartAction product_id={item.id} />
                                    ) : (
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ShoppingCartIcon />}
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            Add to Cart
                                        </Button>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="error"
                                        startIcon={<PaymentIcon />}
                                        onClick={handleBuyNow}
                                    >
                                        Buy Now
                                    </Button>
                                </Grid>
                            </Grid>

                            {/* Product Description */}
                            <Typography variant="body1" color="text.secondary" sx={{ mt: 2, mb: 2 }}>
                                {item.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SingleProduct;
