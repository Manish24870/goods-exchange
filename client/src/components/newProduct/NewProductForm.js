import React, { useState } from "react";
import { connect } from "react-redux";
import {
    Box,
    Grid,
    TextField,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Button,
} from "@mui/material";

import isEmpty from "../../utils/isEmpty";
import { createNewProduct } from "../../actions/productActions";

const NewProductForm = (props) => {
    const [formData, setFormData] = useState({
        productName: "",
        productType: "",
        condition: "",
        usedFor: "",
        usedForType: "months",
        warranty: "",
        expiresIn: "",
        expiresInType: "days",
        additionals: "",
        exchangeWith: "",
        description: "",
    });

    const onFormValueChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // props.registerUser(formData, navigate);
    };

    return (
        <Box mt={2} component="form" noValidate autoComplete="off" onSubmit={onFormSubmit}>
            <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column" }}>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Product name"
                        variant="standard"
                        name="productName"
                        value={formData.productName}
                        onChange={onFormValueChange}
                    />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Product type"
                        variant="standard"
                        name="productType"
                        value={formData.productType}
                        onChange={onFormValueChange}
                    />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid item xs={4}>
                            <FormControl sx={{ width: "100%", marginRight: 0 }} variant="outlined">
                                <InputLabel id="condition-select-label">Condition</InputLabel>
                                <Select
                                    labelId="condition-select-label"
                                    defaultValue=""
                                    label="Condition"
                                    name="condition"
                                    value={formData.condition}
                                    onChange={onFormValueChange}
                                >
                                    <MenuItem value="brand-new">Brand New</MenuItem>
                                    <MenuItem value="lightly-used">Lightly Used</MenuItem>
                                    <MenuItem value="heavily-used">Heavily Used</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <TextField
                                sx={{ width: "35%", marginRight: 2 }}
                                label="Used For"
                                variant="standard"
                                name="usedFor"
                                value={formData.usedFor}
                                onChange={onFormValueChange}
                            />

                            <FormControl sx={{ width: "36%" }} variant="standard">
                                <InputLabel id="used-select-label">Length</InputLabel>
                                <Select
                                    defaultValue="months"
                                    labelId="used-select-label"
                                    label="Used For"
                                    name="usedForType"
                                    value={formData.usedForType}
                                    onChange={onFormValueChange}
                                >
                                    <MenuItem value="months">Months</MenuItem>
                                    <MenuItem value="years">Years</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid item xs={4}>
                            <FormControl sx={{ width: "100%", marginRight: 8 }} variant="outlined">
                                <InputLabel id="warranty-select-label">Warranty</InputLabel>
                                <Select
                                    labelId="warranty-select-label"
                                    defaultValue=""
                                    label="Warranty"
                                    name="warranty"
                                    value={formData.warranty}
                                    onChange={onFormValueChange}
                                >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <TextField
                                sx={{ width: "35%", marginRight: 2 }}
                                label="Expires In"
                                variant="standard"
                                name="expiresIn"
                                value={formData.expiresIn}
                                onChange={onFormValueChange}
                            />

                            <FormControl sx={{ width: "36%" }} variant="standard">
                                <InputLabel id="expires-select-label">Length</InputLabel>
                                <Select
                                    defaultValue="months"
                                    labelId="expires-select-label"
                                    label="Expires In"
                                    name="expiresInType"
                                    value={formData.expiresInType}
                                    onChange={onFormValueChange}
                                >
                                    <MenuItem value="days">Days</MenuItem>
                                    <MenuItem value="months">Months</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Additionals"
                        variant="standard"
                        name="additionals"
                        value={formData.additionals}
                        onChange={onFormValueChange}
                    />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Exchange With"
                        variant="standard"
                        name="exchangeWith"
                        value={formData.exchangeWith}
                        onChange={onFormValueChange}
                    />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <TextField
                        multiline
                        fullWidth
                        rows={3}
                        label="Description"
                        variant="standard"
                        name="description"
                        value={formData.description}
                        onChange={onFormValueChange}
                    />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 6 }}>
                    <Button type="submit" variant="contained" size="large">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        error: state.error,
    };
};

export default connect(mapStateToProps, {})(NewProductForm);
