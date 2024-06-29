import { create } from 'zustand'

const useProductCartStore = create((set) => ({
  cartItems: 10,
  name: null,
  increasePopulation: () => set((state: any) => ({ cartItems: state.cartItems + 1 })),
  removeAllBears: () => set({ cartItems: 0 }),
  updateBears: (newBears: number) => set({ cartItems: newBears }),
}));

export default useProductCartStore;