// CardProduct.js or CardProduct.tsx
import React, { FC } from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IProducts } from '../../Interface/Product.interface';

interface IProd {
    item: IProducts[];
    categoryItem: string[] | string;
}

const CardProduct: FC<IProd> = ({ item, categoryItem }) => {
    const navigate = useNavigate();

    function handleClick(res: any): void {
        console.log(res);
        navigate(`/details/${res.id}`, { state: { res } });
    }

    const filteredItems = categoryItem === 'all' ? item : item.filter(res => res.category === categoryItem);

    return (
        <>
            {filteredItems.map(res => (
                <Col key={res.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card 
                        className="h-100 shadow-sm card-hover-effect" // Apply the hover effect class
                        onClick={() => handleClick(res)}
                        style={{ cursor: 'pointer' }} // Add pointer cursor for clickable effect
                    >
                        <Card.Img 
                            variant="top" 
                            src={res.image} 
                            style={{ height: '160px', objectFit: 'contain' }} 
                            alt="Product"
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
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </>
    );
};

export default CardProduct;
