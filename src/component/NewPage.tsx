import { Container } from "@mui/material";
import useProductCartStore from "../store/cart.store";

const NewPage = () => {
    const cartItem: any = useProductCartStore();
    return (
        <Container sx={{ mt: 19, boxShadow: 6, minHeight: { xs: '100px', md: '600px' } }}>New {cartItem.cartItems}</Container>
    )
}

export default NewPage;