import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Dialog,
  TextField,
  Rating,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import { createAReview } from "../../actions/exchangeActions";

const WriteReview = (props) => {
  const [formData, setFormData] = useState({
    reviewText: "",
    reviewNumber: 4,
  });

  const onFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    // console.log(props.initiatorData.initiatorId._id);
    // console.log(props.ownerData);
    // console.log(props.exchangeId);
    const reviewData = {
      exchangeId: props.exchangeId,
      reviewNumber: formData.reviewNumber,
      reviewText: formData.reviewText,
      reviewedFor: props.initiatorId,
    };
    props.createAReview(reviewData);
    setFormData({ ...formData, reviewText: "", reviewNumber: 4 });
    props.handleClose();
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
        <DialogTitle>Write a review</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Review text"
            fullWidth
            variant="standard"
            name="reviewText"
            sx={{ width: 500 }}
            value={formData.reviewText}
            onChange={onFormDataChange}
            // error={errorMessages.answer ? true : false}
            // helperText={errorMessages.answer ? errorMessages.answer : null}
          />
          <Typography variant="p" sx={{ display: "block", marginTop: 4 }}>
            Select a review number
          </Typography>
          <Rating
            name="reviewNumber"
            defaultValue={4}
            max={10}
            value={Number(formData.reviewNumber)}
            onChange={onFormDataChange}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" sx={{ marginBottom: 1 }}>
            Post Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default connect(null, { createAReview })(WriteReview);
