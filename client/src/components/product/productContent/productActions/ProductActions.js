import React from "react";
import { Box, Button } from "@mui/material";
import { CompareArrowsOutlined, FavoriteBorderOutlined } from "@mui/icons-material";

const ProductActions = (props) => {
    return (
        <Box mb={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
                // onClick={handleClickOpen}
                variant="contained"
                size="large"
                sx={{
                    textTransform: "none",
                    marginRight: 2,
                }}
            >
                <CompareArrowsOutlined sx={{ marginRight: 1 }} />
                Exchange
            </Button>
            <Button
                variant="contained"
                size="large"
                color="secondary"
                sx={{
                    textTransform: "none",
                }}
                // onClick={onFavoriteAdd}
            >
                <FavoriteBorderOutlined sx={{ marginRight: 1 }} />
                Favorite
            </Button>
        </Box>
    );
};

export default ProductActions;
