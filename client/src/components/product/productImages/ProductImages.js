import React from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";

const ProductImages = (props) => {
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
        <ImageListItem rows={1}>
          <img
            alt={"images[0].name"}
            src={"https://picsum.photos/1200/768?w=220&h=220&auto=format"}
            loading="lazy"
          />
        </ImageListItem>
        <ImageListItem rows={1}>
          <img
            alt={"images[1].name"}
            src={"https://picsum.photos/1200/768?w=220&h=220&auto=format"}
            loading="lazy"
          />
        </ImageListItem>
        <ImageListItem rows={1}>
          <img
            alt={"images[2].name"}
            src={"https://picsum.photos/1000/700?w=220&h=220&auto=format"}
            loading="lazy"
          />
        </ImageListItem>
      </ImageList>
    </Box>
  );
};

export default ProductImages;
