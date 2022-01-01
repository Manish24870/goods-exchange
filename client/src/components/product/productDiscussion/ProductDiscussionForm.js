import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Grid, Button } from "@mui/material";

const ProductDiscussionForm = (props) => {
    const [formData, setFormData] = useState({
        text: "",
    });

    const onFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <React.Fragment>
            <Typography variant="p">Ask the questions related to the product here.</Typography>
            <Box component="form" onSubmit={onFormSubmit} noValidate autoComplete="off" mt={2}>
                <Grid container>
                    <Grid item xs={10}>
                        <TextField
                            name="text"
                            value={formData.text}
                            onChange={onFormDataChange}
                            fullWidth
                            label="Your Question"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} mt={2}>
                        <Button type="submit" color="primary" variant="contained">
                            Ask
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
};

export default ProductDiscussionForm;
