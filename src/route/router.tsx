import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import SingleProduct from "../component/singleProduct";
import AppLayout from "../layout/main.layout";
//   import ProductList from "../screens/productList";
//   import ProductDetails from "../screens/productDetails";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "details/:product_id", // :slug/p/:product_id
                element: <SingleProduct />,
            },

        ]
    },
    {
        path: "new-page",
        element: <div> New page</div>
    }
]);

export default router;