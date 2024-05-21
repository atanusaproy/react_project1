import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IProductCategory, IProducts } from '../../Interface/Product.interface';
import { FC } from 'react';
import Grid from '@material-ui/core/Grid';

interface IProd {
    item: IProducts[];
    categoryItem: string[] | string;
}

const CardProduct: FC<IProd> = ({ item, categoryItem }) => {
    const result = item.filter(res => res.category === categoryItem);    
    return (
        <>
            {(result.length === 0) ? item.map(res => {
                return (<Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="160"
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
                return (<Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="160"
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