import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Typography, TextField, Grid, Button } from "@mui/material";

import isEmpty from "../../../utils/isEmpty";
import { createNewQuestion } from "../../../actions/productActions";
import { clearErrors } from "../../../actions/errorActions";

const ProductDiscussionForm = (props) => {
    const [formData, setFormData] = useState({
        question: "",
    });

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

    const onFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.createNewQuestion(props.productId, formData, setFormData);
        setFormData({ question: "" });
    };

    return (
        <React.Fragment>
            <Typography variant="p">Ask the questions related to the product here.</Typography>
            <Box component="form" onSubmit={onFormSubmit} noValidate autoComplete="off" mt={2}>
                <Grid container>
                    <Grid item xs={10}>
                        <TextField
                            name="question"
                            value={formData.question}
                            onChange={onFormDataChange}
                            fullWidth
                            label="Your Question"
                            variant="standard"
                            error={errorMessages.question ? true : false}
                            helperText={errorMessages.question ? errorMessages.question : null}
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

const mapStateToProps = (state) => {
    return {
        productId: state.product.product._id,
        error: state.error,
    };
};

export default connect(mapStateToProps, { createNewQuestion, clearErrors })(ProductDiscussionForm);
