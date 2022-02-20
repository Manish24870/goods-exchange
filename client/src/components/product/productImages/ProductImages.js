import React from "react";
import { Box, ImageListItem, useTheme } from "@mui/material";
import useWindowDimensions from "./useWindowDimensions";

const ProductImages = (props) => {
  const { width: viewWidth } = useWindowDimensions();
  const theme = useTheme();

  let images;

  // Check browser width to show 1,2 or 3 images
  if (viewWidth >= theme.breakpoints.values.md) {
    images = props.images.slice(0, 3);
  } else if (viewWidth >= theme.breakpoints.values.sm) {
    images = props.images.slice(0, 2);
  } else {
    images = props.images.slice(0, 1);
  }

  const renderImages = images.slice(0, 3).map((image) => {
    return (
      <ImageListItem key={image._id}>
        <img
          src={process.env.REACT_APP_BASE_IMAGE_URL + image.url}
          alt={image._id}
          loading="lazy"
        />
      </ImageListItem>
    );
  });
  return (
    <Box
      mt={3}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(3,1fr)",
        },
      }}
    >
      {/* <ImageList
        // cols={3}
        gap={14}
        sx={{
          borderRadius: "8px",
          height: 260,
          overflow: "hidden",
          cols: 3,
        }}
      > */}
      {renderImages}
    </Box>
  );
};

export default ProductImages;
