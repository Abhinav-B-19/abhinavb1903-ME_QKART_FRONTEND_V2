import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";
// import Checkout from "./Checkout"

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 *
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 *
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  let cartItems = [];
  // console.log("generate:", cartData, productsData);
  for (let i = 0; i < cartData.length; i++) {
    for (let j = 0; j < productsData.length; j++) {
      // console.log("j", productsData[j]);
      if (cartData[i].productId === productsData[j]._id) {
        // cartItems.push(productsData[j]);
        cartItems.push({
          name: productsData[j].name,
          qty: cartData[i].qty,
          cost: productsData[j].cost,
          category: productsData[j].category,
          rating: productsData[j].rating,
          image: productsData[j].image,
          id: productsData[j]._id,
        });
        // console.log("if", productsData[j], "cartItem", cartItems);
      }

      // if(x.productId===productsData.productId){
      //   console.log(x);
      //   return x;
      // }
    }
    // console.log("x", cartData[i]);
  }
  return cartItems;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */

//  name: productsData[j].name,
//  qty: cartData[i].qty,
//  cost: productsData[j].cost,
//  category: productsData[j].category,
//  rating: productsData[j].rating,
//  image: productsData[j].image,
//  id: productsData[j]._id,
// [{
// category: "Fashion"
// cost: 50
// id: "BW0jAAeDJmlZCF8i"
// image: "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/42d4d057-8704-4174-8d74-e5e9052677c6.png"
// name: "UNIFACTOR Mens Running Shoes"
// qty: 1
// rating: 5
// }]

export const getTotalCartValue = (items = []) => {
  let cartValues = 0;
  // console.log("items", items);
  for (let i = 0; i < items.length; i++) {
    cartValues += items[i].qty * items[i].cost;
  }
  // console.log(cartValues);
  return cartValues;
};

export const getTotalItems = (items = []) => {
  let length = 0;
  items.forEach((item) => {
    length += item.qty;
  });
  return length;
};

/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 *
 */
const ItemQuantity = ({ value, handleAdd, handleDelete, isReadOnly }) => {
  return (
    <Stack direction="row" alignItems="center">
      {!isReadOnly && (
        <IconButton size="small" color="primary" onClick={handleDelete}>
          <RemoveOutlined />
        </IconButton>
      )}
      {isReadOnly && <span>Qty:</span>}
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      {!isReadOnly && (
        <IconButton size="small" color="primary" onClick={handleAdd}>
          <AddOutlined />
        </IconButton>
      )}

      {/* {!isReadOnly && (
        <IconButton size="small" color="primary" onClick={handleDelete}>
          <RemoveOutlined />
        </IconButton>
      )}
      {isReadOnly && <span>Qty:</span>}
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      {!isReadOnly && (
        <IconButton size="small" color="primary" onClick={handleAdd}>
          <AddOutlined />
        </IconButton>
      )} */}
    </Stack>
  );
};

/**
 * Component to display the Cart view
 *
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 *
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 *
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 *
 *
 */
const Cart = ({ products, items = [], handleQuantity, isReadOnly }) => {
  const token = localStorage.getItem("token");
  const history = useHistory();
  let ishidden = isReadOnly;

  // console.log("itemsin", items);
  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        {/* =============CART CARD============= */}
        {items.map((item, id) => {
          return (
            <Box display="flex" alignItems="flex-start" padding="1rem" key={id}>
              <Box className="image-container">
                <img
                  src={item.image}
                  alt={item.id}
                  width="100%"
                  height="100%"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"
              >
                <div>{item.name}</div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <ItemQuantity
                    value={item.qty}
                    isReadOnly={ishidden}
                    handleAdd={() =>
                      handleQuantity(
                        token,
                        items,
                        products,
                        item.id,
                        item.qty + 1,
                        { preventDuplicate: false }
                      )
                    }
                    handleDelete={() =>
                      handleQuantity(
                        token,
                        items,
                        products,
                        item.id,
                        item.qty - 1,
                        { preventDuplicate: false }
                      )
                    }
                  />
                  <Box padding="0.5rem" fontWeight="700">
                    ${item.cost}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
        {/* =================CART CARD=========== */}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>

        {/* <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
            // onClick={Checkout}
            onClick={()=>{history.push("/checkout")}}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Cart; */}
        {!isReadOnly && (
          <Box display="flex" justifyContent="flex-end" className="cart-footer">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              onClick={() =>
                history.push({
                  pathname: "/checkout",
                  state: { items: items, products: products },
                })
              }
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>
      {isReadOnly && (
        <Box className="cart" padding="1rem">
          <h2>Order Details</h2>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box color="#3C3C3C" alignSelf="center" pb="0.5rem">
              Products
            </Box>
            <Box color="#3C3C3C">{getTotalItems(items)}</Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box color="#3C3C3C" alignSelf="center" pb="0.5rem">
              Subtotal
            </Box>
            <Box color="#3C3C3C">${getTotalCartValue(items)}</Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box color="#3C3C3C" alignSelf="center" pb=".5rem">
              Shipping
            </Box>
            <Box color="#3C3C3C">$0</Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              color="#3C3C3C"
              alignSelf="center"
              pb="0.5rem"
              fontWeight="700"
              fontSize="1.25rem"
            >
              Total
            </Box>
            <Box color="#3C3C3C" fontWeight="700" fontSize="1.25rem">
              ${getTotalCartValue(items)}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cart;
