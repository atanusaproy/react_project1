import {
    createBrowserRouter,
    useLocation,
    useParams,
} from "react-router-dom";
import App from "../App";
import SingleProduct from "../component/ProductDetails/singleProduct";
import AppLayout from "../layout/main.layout";
import NewPage from "../component/NewPage";

const ConditionalRedirect = () => {
    const location = useLocation();
    const params = useParams();

    const queryParams = new URLSearchParams(location.search);
    const hasQueryParams = queryParams.toString() !== '';

    const additionalPath = location.pathname.split('/').slice(3).join('/');
    const hasAdditionalPath = additionalPath !== '';

    if (hasQueryParams || hasAdditionalPath) {
        return <App />;
    }

    return <SingleProduct />;
};

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "details/:product_id",
                element: <SingleProduct />,
            },
            {
                path: "new-page",
                element: <NewPage />
            }
        ]
    },
    
]);

export default router;
