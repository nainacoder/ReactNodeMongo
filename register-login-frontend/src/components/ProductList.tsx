import { useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  IconButton,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { addToCart, getProducts } from './reducer/ProductSliceReducer';
import { useSelector } from 'react-redux';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _id: string;
  }
}

function HomePage() {
  const dispatch = useDispatch();
  const { cartItems, products } = useSelector((state: any) => state.cart);

  console.log('cartItems&&&&', cartItems);

  useEffect(() => {
    axios.get('http://localhost:5001/get-products').then((response) => {
      const productList = response.data.data;
      dispatch(getProducts(productList));
    });
  }, []);
  console.log('products***', products);

  function handleDelete(id: string) {
    axios
      .delete(`http://localhost:5001/delete-products/${id}`)
      .then((response) => {
        if (response.data.message === 'deleted successfully') {
          axios.get('http://localhost:5001/get-products').then((response) => {
            const productList = response.data.data;
            dispatch(getProducts(productList));
            console.log(productList, 'productList^^^^^^^^^^^^^^^^^^^^^');
          });
        }
      });
  }
  console.log('productListt');

  function handleAddToCart(product: any) {
    dispatch(addToCart(product));
    console.log('product++++', product);
  }

  return (
    <>
      {products.length === 0 ? (
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          There are no products, please add some by clicking
          <b> Add Product </b> from header
        </p>
      ) : (
        <ImageList cols={3} sx={{ pl: 6 }}>
          {products.map((product: any) => {
            console.log(product, 'product*******');
            return (
              <Card sx={{ maxWidth: 350 }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.productName}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.supplierName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.unit}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.price}
                    </Typography>
                    <IconButton onClick={() => handleDelete(product._id)}>
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      size="small"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </ImageList>
      )}
    </>
  );
}

export default HomePage;
