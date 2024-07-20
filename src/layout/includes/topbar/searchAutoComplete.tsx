import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductService from '../../../Service/ProductService';
import { IProducts } from '../../../Interface/Product.interface';

const SearchAutoComplete = () => {
    const [productList, setProductList] = useState<IProducts[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const item = location.state?.res as IProducts;

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const productList = await new ProductService().getProductList();
                console.log(productList);
                setProductList([...productList]);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchProductList();
    }, []);

    const handleAutocompleteChange = (res: any) => {
        // console.log(res);
        if (res) {
            navigate(`/details/${res.id}`, { state: { res } });
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Implement search functionality if needed
    };

    return (
        <Autocomplete
            id="search-autocomplete"
            options={productList}
            //   getOptionLabel={(option) => `<img src={option.image}>` + option.title}
            getOptionLabel={(option) => option.title}
            onChange={(event, res) => handleAutocompleteChange(res)}
            renderOption={(props, option) => (
                <li {...props}>
                  <div>
                    <img src={option.image} alt={option.title} style={{ marginRight: 10, height: 20, width: 20 }} />
                    {option.title}
                  </div>
                </li>
              )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Search"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        className: "me-2",
                        onChange: handleSearchChange,
                        style: { backgroundColor: 'white', height: '40px', minWidth: '250px' },
                    }}
                />
            )}
        />
    );
};

export default SearchAutoComplete;
