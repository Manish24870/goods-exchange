import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from "@mui/material";

import isEmpty from "../../../utils/isEmpty";
import { createNewAnswer } from "../../../actions/productActions";
import { clearErrors } from "../../../actions/errorActions";

const ProductAnswerForm = (props) => {
    const [formData, setFormData] = useState({
        answer: "",
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
        props.createNewAnswer(props.productId, props.questionId, formData, props.handleClose);
    };

    return (
        <Box>
            <Dialog
                component="form"
                open={props.open}
                onClose={props.handleClose}
                onSubmit={onFormSubmit}
                noValidate
                autoComplete="off"
            >
                <DialogTitle>Your Answer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Answer"
                        fullWidth
                        variant="standard"
                        name="answer"
                        sx={{ width: 500 }}
                        value={formData.answer}
                        onChange={onFormDataChange}
                        error={errorMessages.answer ? true : false}
                        helperText={errorMessages.answer ? errorMessages.answer : null}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" sx={{ marginBottom: 1 }}>
                        Post Answer
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        productId: state.product.product._id,
        error: state.error,
    };
};

export default connect(mapStateToProps, { createNewAnswer, clearErrors })(ProductAnswerForm);
