import { create } from 'zustand';
import { IProducts } from '../Interface/Product.interface';

interface ICartItem {
  item_id: number;
  name: string;
  image: string;
  price: number;
  qty: number;
}

interface ICart {
  cartItems: ICartItem[];
  total: number;
  addToCart: (product: IProducts) => void;
  updateCart: (product_id: number, action: 'I' | 'D' | 'R') => void;
}

const useProductCartStore = create<ICart>((set, get) => ({
  cartItems: [],
  total: 0,

  addToCart: (product) => {
    const { cartItems } = get();
    const _items = [...cartItems];
    const getCurrentItemFromCart = _items.find(each => each.item_id === product.id);

    if (getCurrentItemFromCart) {
      getCurrentItemFromCart.qty = getCurrentItemFromCart.qty + 1;
    } else {
      _items.push({
        item_id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }

    const newTotal = _items.reduce((total, item) => total + item.qty, 0);

    set(() => ({
      cartItems: _items,
      total: newTotal,
    }));
  },

  updateCart: (product_id, action) => {
    const { cartItems } = get();
    const _items = [...cartItems];
    const getCurrentItemFromCart = _items.find(each => each.item_id === product_id);

    if (getCurrentItemFromCart) {
      if (action === 'I') {
        getCurrentItemFromCart.qty += 1;
      } else if (action === 'D') {
        getCurrentItemFromCart.qty -= 1;
        if (getCurrentItemFromCart.qty <= 0) {
          _items.splice(_items.indexOf(getCurrentItemFromCart), 1);
        }
      } else if (action === 'R') {
        _items.splice(_items.indexOf(getCurrentItemFromCart), 1);
      }
    }

    const newTotal = _items.reduce((total, item) => total + item.qty, 0);

    set(() => ({
      cartItems: _items,
      total: newTotal,
    }));
  }
}));

export default useProductCartStore;
