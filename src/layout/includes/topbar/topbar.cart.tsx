import { ShoppingCart } from "@mui/icons-material"
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import useProductCartStore from "../../../store/cart.store";
import Badge from "@mui/material/Badge";

const TopBarCart = () => {

    const cartItem: any = useProductCartStore();

    return (
        <Nav.Link as={Link} to="/cart" style={{ color: 'red', fontSize: 15 }}>
            <Badge
                badgeContent={cartItem.total}
                color="secondary"
                max={99}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <ShoppingCart className="nav-icon" fontSize="large" />
            </Badge>
        </Nav.Link>
    )
}

export default TopBarCart;