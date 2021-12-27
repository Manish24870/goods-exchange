import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";

import NewProductForm from "./NewProductForm";

const NewProduct = (props) => {
    return (
        <Box mt={11}>
            <Container maxWidth="lg">
                <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                    <Grid item xs={7}>
                        <Typography variant="h5">Create new product</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <NewProductForm />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default NewProduct;
