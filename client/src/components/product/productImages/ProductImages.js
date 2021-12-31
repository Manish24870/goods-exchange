import React from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";

const ProductImages = (props) => {
    return (
        <Box mt={3}>
            <ImageList
                cols={12}
                rowHeight={110}
                variant="quilted"
                gap={14}
                sx={{ borderRadius: "8px" }}
            >
                <ImageListItem cols={5} rows={2}>
                    <img alt={"images[0].name"} src={"https://picsum.photos/500/300"} />
                </ImageListItem>
                <ImageListItem cols={4} rows={2}>
                    <img alt={"images[1].name"} src={"https://picsum.photos/500/300"} />
                </ImageListItem>
                <ImageListItem cols={3} rows={1}>
                    <img alt={"images[2].name"} src={"https://picsum.photos/500/300"} />
                </ImageListItem>
                <ImageListItem cols={3} rows={1}>
                    <img alt={"images[3].name"} src={"https://picsum.photos/500/300"} />
                </ImageListItem>
            </ImageList>
        </Box>
    );
};

export default ProductImages;
