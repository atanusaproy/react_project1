import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import SingleProduct from "../component/singleProduct";
//   import ProductList from "../screens/productList";
//   import ProductDetails from "../screens/productDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
      path: "details/:product_id", // :slug/p/:product_id
      element:  <SingleProduct />,
    },
]);

export default router;