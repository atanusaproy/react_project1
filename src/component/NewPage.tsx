import { Container } from "@mui/material";
import useProductCartStore from "../store/cart.store";
import { useEffect } from "react";

const NewPage = () => {
    const cartItem: any = useProductCartStore();

    return (
        <Container sx={{ mt: 19, boxShadow: 6, minHeight: { xs: '100px', md: '600px' } }}>
            New Page
            <div>
                <button onClick={() => {
                    if (cartItem.cartItems > 0) {
                    cartItem.decreaseCartItem();
                    }
                }}>-</button>
                    {cartItem.cartItems}
                <button onClick={() => {
                    cartItem.increaseCartItem();
                }}>+</button>

            </div>
        </Container>
    )
}

export default NewPage;