import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IProductCategory, IProducts } from '../../Interface/Product.interface';
import { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link, useNavigate } from 'react-router-dom';

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
    const result = item.filter(res => res.category === categoryItem);
    return (
        <>
            {(result.length === 0) ? item.map(res => {
                return (<Grid item key={res.id} xs={12} sm={6} md={4} lg={3}>
                    <Card onClick={() => handleClick(res)} sx={{ height: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <CardMedia
                            component="img"
                            height="160"
                            sx={{ height: '100px', width: '100px', objectFit: 'contain' }} 
                            image={res.image}
                            alt="Product"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {res.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Description of the product.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>)
            })
                :
                result.map(res => {
                    return (<Grid item key={res.id} xs={12} sm={6} md={4} lg={3}>
                        <Card key={res.id} onClick={() => handleClick(res)} sx={{ height: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <CardMedia
                                component="img"
                                height="160"
                                sx={{ height: '100px', width: '100px', objectFit: 'contain'}} 
                                image={res.image}
                                alt="Product"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {res.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Description of the product.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>)
                })}
        </>
    )
};

export default CardProduct;