import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
//   import ProductList from "../screens/productList";
//   import ProductDetails from "../screens/productDetails";

const router = createBrowserRouter([
    {
        path: "/home",
        element: <App />,
    },
    // {
    //   path: "details/:product_id", // :slug/p/:product_id
    //   element:  <ProductDetails />,
    // },
]);

export default router;