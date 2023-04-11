import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  // console.log("product", product);
  return (
    <Card className="card">
      <CardMedia  component="img" style={{ height: "140px" }} image={product.image} alt={product._id}/>
      <CardContent>
        <Typography colour="textSecondary" variant="h6">
          {product.name}
        </Typography>
        <Typography colour="textSecondary" variant="h6">
          ${product.cost}
        </Typography>
        <Typography>
          <Rating name="read-only" value={product.rating} readOnly />
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button
          variant="contained"
          startIcon={<AddShoppingCartOutlined />}
          className="card-button"
          fullWidth
          onClick={handleAddToCart}
          name="add to cart"
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

// Image
// Product title
// Product price
// Product rating
// “Add to cart” button

// {
//   "name":"Tan Leatherette Weekender Duffle",
//   "category":"Fashion",
//   "cost":150,
//   "rating":4,
//   "image":"https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
//   "_id":"PmInA797xJhMIPti"
//   }

export default ProductCard;
