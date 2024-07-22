import { FC } from 'react';
import useProductCartStore from '../../store/cart.store';
import './cartAction.css';

interface IProductCardAction {
    product_id: number;
}

const CartAction: FC<IProductCardAction> = ({ product_id }) => {
    const { updateCart, cartItems } = useProductCartStore();

    const handleAddItemInc = () => {
        updateCart(product_id, 'I');
    };

    const handleAddItemDesc = () => {
        updateCart(product_id, 'D');
    };

    const isCurrentItemInCart = () => {
        return cartItems.find(eachCartItem => eachCartItem.item_id === product_id);
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-2">
            <button
                className="btn btn-outline-secondary"
                onClick={handleAddItemDesc}
                style={{ minWidth: '40px' }}
            >
                -
            </button>
            <input
                type="number"
                className="form-control mx-2 text-center"
                value={isCurrentItemInCart()?.qty || 0}
                readOnly
                style={{ width: '60px' }}
            />
            <button
                className="btn btn-outline-secondary"
                onClick={handleAddItemInc}
                style={{ minWidth: '40px' }}
            >
                +
            </button>
        </div>
    );
};

export default CartAction;
