import React from "react";
import { connect } from "react-redux";
import { Box, Typography, Button } from "@mui/material";

const ProductQuestion = (props) => {
  let canAnswer;

  // Only show Answer button if current user is the owner
  if (props.userId === props.productOwner) {
    canAnswer = (
      <Button
        size="small"
        variant="outlined"
        sx={{ marginLeft: 2, textTransform: "none" }}
        onClick={(e) => props.handleClickOpen(e, props.question._id)}
      >
        Answer
      </Button>
    );
  }
  return (
    <Box mb={3} sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="p" sx={{ fontSize: "1.07em", marginBottom: 1 }}>
        {"Q: " + props.question.ques}
        {canAnswer}
      </Typography>
      <Typography variant="p">
        {props.question.ans ? `A: ${props.question.ans}` : null}
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id,
    productOwner: state.product.product.owner._id,
  };
};

export default connect(mapStateToProps)(ProductQuestion);
