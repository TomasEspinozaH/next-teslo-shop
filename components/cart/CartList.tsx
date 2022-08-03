import { FC, useContext } from 'react';
import NextLink from 'next/link';

import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ItemCounter } from '../ui';

import { CartContext } from '../../context';
import { IOrderItem, IPCartProduct } from '../../interfaces';

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {

  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const onNewCartQuantityValue = (product: IPCartProduct, newQuantity: number) => {
    product.quantity = newQuantity;
    updateCartQuantity(product);
  }

  const productsToShow = products ? products : cart;

  return (
    <>
      {
        productsToShow.map(product => (
          <Grid container spacing={ 2 } key={product.slug + product.size} sx={{ mb: 1 }}>
            <Grid item xs={ 3 }>
              {/* LLevar a la pagina del producto */}
              <NextLink href={`/product/${ product.slug }`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia 
                      image={ product.image } 
                      component="img"
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={ 7 }>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{ product.title }</Typography>
                <Typography variant="body1">Talla: <strong>{product.size}</strong></Typography>
                {
                  editable
                  ? (
                    <ItemCounter 
                      currentValue={ product.quantity }
                      maxValue={ 10 }
                      updatedQuantity={(value) => onNewCartQuantityValue(product as IPCartProduct, value)}
                    />
                    )
                  : (
                    <Typography>{product.quantity} {product.quantity > 1 ? 'Productos' : 'Producto'}</Typography>
                  )
                }
                

              </Box>
            </Grid>

            <Grid item xs={ 2 } display="flex" alignItems="center" flexDirection="column">
              <Typography variant="subtitle1">{`$${product.price}`}</Typography>
              {
                editable && ( 
                  <Button 
                    variant="text" 
                    color="error"
                    onClick={ () => removeCartProduct(product as IPCartProduct) }
                  >
                    Remover
                  </Button>
                )
              }
            </Grid>

          </Grid>
        ))
      }
    </>
  )
}
