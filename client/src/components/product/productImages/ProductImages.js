import React from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";

const ProductImages = (props) => {
  const renderImages = props.images.slice(0, 3).map((image) => {
    return (
      <ImageListItem key={image._id} rows={1}>
        <img
          alt={image._id}
          src={process.env.REACT_APP_BASE_IMAGE_URL + image.url}
        />
      </ImageListItem>
    );
  });
  return (
    <Box mt={3}>
      <ImageList
        cols={3}
        gap={14}
        sx={{
          borderRadius: "8px",
          height: 260,
          overflow: "hidden",
        }}
      >
        {renderImages}
      </ImageList>
    </Box>
  );
};

export default ProductImages;
