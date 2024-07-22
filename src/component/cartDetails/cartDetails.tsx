import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { IProducts } from '../../Interface/Product.interface';
import useProductCartStore from '../../store/cart.store';
import CartAction from './cartItemManageAction';

const CartDetails: React.FC = () => {
    const { cartItems, updateCart } = useProductCartStore();

    const isCurrentItemInCart = (productId: number) => {
        return cartItems.find(eachCartItem => eachCartItem.item_id === productId);
    }

    const grandTotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);

    if (!cartItems.length) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h5" component="div">
                    No Items in the Cart
                </Typography>
            </Box>
        );
    }

    const handleRemoveFromCart = (item: any) => {
        updateCart(item, 'R');
    };

    return (
        <Container sx={{ mt: 15, boxShadow: 6 }}>
            <Grid container spacing={2}>
                {cartItems.map((item) => (
                    <Grid item xs={12} key={item.item_id}>
                        <Card sx={{ display: 'flex', alignItems: 'center' }}>
                            <CardMedia
                                component="img"
                                image={item.image}
                                alt={item.name}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    objectFit: 'cover',
                                }}
                            />
                            <CardContent sx={{ flex: '1 0 auto', wordWrap: 'break-word' }}>
                                <Typography component="div" variant="h6" sx={{ wordWrap: 'break-word', fontSize: '0.875rem', }}>
                                    {item.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {/* ${item.price.toFixed(2)} */}
                                    ${(item.price * item.qty).toFixed(2)}
                                </Typography>
                                <Box display="flex" justifyContent="center" mt={1}>
                                    {isCurrentItemInCart(item.item_id) ? (
                                        <CartAction product_id={item.item_id} />
                                    ) : <span></span>}
                                </Box>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                <IconButton aria-label="delete" onClick={() => handleRemoveFromCart(item.item_id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box display="flex" flexDirection="column" alignItems="flex-end" mt={2}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        mb: 1,
                        fontWeight: 'bold',
                        color: 'black',
                    }}
                >
                    Grand Total:
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        color: 'green',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    ${grandTotal.toFixed(2)}
                </Typography>
                <Button variant="contained" color="primary">
                    Proceed to Checkout
                </Button>
            </Box>
            <br></br>
            <br></br>
        </Container>
    );
};

export default CartDetails;
