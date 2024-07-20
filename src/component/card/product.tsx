import React, { FC } from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IProducts } from '../../Interface/Product.interface';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useProductCartStore from '../../store/cart.store';

interface IProd {
    item: IProducts[];
    categoryItem: string[] | string;
}

const CardProduct: FC<IProd> = ({ item, categoryItem }) => {
    const navigate = useNavigate();
    const {addToCart} = useProductCartStore();

    function handleClick(res: any): void {
        navigate(`/details/${res.id}`, { state: { res } });
    }

    function handleAddToCart(res: IProducts): void {
       // console.log('Added to cart:', res);
        addToCart(res);
    }

    const filteredItems = categoryItem === 'all' ? item : item.filter(res => res.category === categoryItem);

    return (
        <>
            {filteredItems.map(res => (
                <Col key={res.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card
                        className="h-100 shadow-sm card-hover-effect"
                        style={{ cursor: 'pointer' }}
                    >
                        <Card.Img
                            variant="top"
                            src={res.image}
                            style={{ height: '160px', objectFit: 'contain' }}
                            alt="Product"
                            onClick={() => handleClick(res)}
                        />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="flex-grow-1">
                                {res.title.length > 30 ? res.title.substring(0, 30) + '...' : res.title}
                            </Card.Title>
                            <Card.Text className="text-muted mb-2">
                                Price: <span style={{ color: 'green' }}>${res.price.toFixed(2)}</span>
                            </Card.Text>
                            <div className="d-flex align-items-center mb-2">
                                <div className="text-warning">
                                    {Array.from({ length: Math.round(res.rating.rate) }, (_, i) => (
                                        <span key={i}>&#9733;</span> // filled star
                                    ))}
                                </div>
                                <div className="ml-2">
                                    {res.rating.rate} ({res.rating.count} reviews)
                                </div>
                            </div>
                            <Button
                                variant="primary"
                                onClick={() => handleAddToCart(res)}
                                className="d-flex align-items-center justify-content-center"
                                style={{ flexDirection: 'row' }}
                            >
                                <ShoppingCartIcon style={{ marginRight: '5px' }} />
                                Add to Cart
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </>
    );
};

export default CardProduct;
