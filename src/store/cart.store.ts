import { create } from 'zustand';
import { IProducts } from '../Interface/Product.interface';

interface ICart {
  cartItems: ICartItem[];
  addToCart: (product: IProducts) => void;
}

interface ICartItem {
  item_id: number; name: string, image: string; price: number; qty: number;
}

const useProductCartStore = create<ICart>((set, get) => ({
  cartItems: [],
  total: 0,

  addToCart: (product) => {
    const { cartItems } = get();
    // console.log(product);

    const _items = [...cartItems];
    // console.log(_items);

    const getCurrentItemFromCart = _items.find(each => each.item_id === product.id);
    if (getCurrentItemFromCart) {
      getCurrentItemFromCart.qty = getCurrentItemFromCart.qty + 1;
    } else {
      _items.push({
        item_id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        qty: 1
      })
    }

    const newTotal = _items.reduce((total, item) => total + item.qty, 0);

    console.log(_items);


    set(() => ({
      cartItems: _items,
      total: newTotal,
    }));
    // set(() => ({
    //   cartItems: [...cartItems]
    // }))

  }


}));

export default useProductCartStore;