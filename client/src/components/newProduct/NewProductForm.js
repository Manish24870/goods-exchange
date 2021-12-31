import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { clearErrors } from "../../actions/errorActions";

const NewProductForm = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: "",
        productKind: "",
        condition: "",
        usedFor: "",
        usedForType: "Months",
        warranty: "",
        expiresIn: "",
        expiresInType: "Days",
        additionals: "",
        exchangeWith: "",
        description: "",
    });
    console.log(formData.additionals);

    const [errorMessages, setErrorMessages] = useState({});

    //Hook for getting error message
    useEffect(() => {
        setErrorMessages({});
        if (!isEmpty(props.error)) {
            setErrorMessages(props.error.data.errors);
        }
    }, [props.error]);

    //Hook for removing errors when component unmounts
    useEffect(() => {
        return () => {
            props.clearErrors();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onFormValueChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.createNewProduct(formData, navigate);
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
                        error={errorMessages.productName ? true : false}
                        helperText={errorMessages.productName ? errorMessages.productName : null}
                    />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="Product kind"
                        variant="standard"
                        name="productKind"
                        value={formData.productKind}
                        onChange={onFormValueChange}
                        error={errorMessages.productKind ? true : false}
                        helperText={errorMessages.productKind ? errorMessages.productKind : null}
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
                                    error={errorMessages.condition ? true : false}
                                >
                                    <MenuItem value="Brand New">Brand New</MenuItem>
                                    <MenuItem value="Lightly Used">Lightly Used</MenuItem>
                                    <MenuItem value="Heavily Used">Heavily Used</MenuItem>
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
                                error={errorMessages.usedFor ? true : false}
                                helperText={errorMessages.usedFor ? errorMessages.usedFor : null}
                            />

                            <FormControl sx={{ width: "36%" }} variant="standard">
                                <InputLabel id="used-select-label">Length</InputLabel>
                                <Select
                                    defaultValue="Months"
                                    labelId="used-select-label"
                                    label="Used For"
                                    name="usedForType"
                                    value={formData.usedForType}
                                    onChange={onFormValueChange}
                                >
                                    <MenuItem value="Months">Months</MenuItem>
                                    <MenuItem value="Years">Years</MenuItem>
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
                                    error={errorMessages.warranty ? true : false}
                                >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
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
                                error={errorMessages.expiresIn ? true : false}
                                helperText={
                                    errorMessages.expiresIn ? errorMessages.expiresIn : null
                                }
                            />

                            <FormControl sx={{ width: "36%" }} variant="standard">
                                <InputLabel id="expires-select-label">Length</InputLabel>
                                <Select
                                    defaultValue="Months"
                                    labelId="expires-select-label"
                                    label="Expires In"
                                    name="expiresInType"
                                    value={formData.expiresInType}
                                    onChange={onFormValueChange}
                                >
                                    <MenuItem value="Days">Days</MenuItem>
                                    <MenuItem value="Months">Months</MenuItem>
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
                        error={errorMessages.exchangeWith ? true : false}
                        helperText={errorMessages.exchangeWith ? errorMessages.exchangeWith : null}
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
                        error={errorMessages.description ? true : false}
                        helperText={errorMessages.description ? errorMessages.description : null}
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

export default connect(mapStateToProps, { createNewProduct, clearErrors })(NewProductForm);
