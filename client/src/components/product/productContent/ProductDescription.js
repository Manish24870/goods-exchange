import React from "react";
import { Box, Typography, Avatar, Divider } from "@mui/material";

import ExchangerDetails from "./exchangerDetails/ExchangerDetails";

const ProductDescription = (props) => {
    return (
        <Box>
            <Typography color="primary" variant="h5" sx={{ fontWeight: 600 }}>
                {"product.name"}
            </Typography>
            <Box mt={1} sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                    alt={"product.posterDetails.name"}
                    src={"product.posterDetails.photo"}
                    sx={{ marginRight: 2, height: "35px", width: "35px", bgcolor: "#2196f3" }}
                ></Avatar>
                <Typography variant="h6" sx={{ fontWeight: 400 }}>
                    {"product.posterDetails.name"}
                </Typography>
                <Typography variant="p" sx={{ opacity: "70%", fontSize: "0.9em", marginLeft: 2 }}>
                    | &nbsp;&nbsp;&nbsp;{"product.postedDate.toUTCString().slice(0, 26)"}
                </Typography>
            </Box>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

            <Box>
                <Typography mb={1} variant="h6" sx={{ fontWeight: 500 }}>
                    Description
                </Typography>
                <Typography variant="p" sx={{ lineHeight: "1.5" }}>
                    {"product.description"}
                </Typography>
            </Box>
            <ExchangerDetails />
        </Box>
    );
};

export default ProductDescription;
