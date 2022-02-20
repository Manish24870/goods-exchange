import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import ProductQuestion from "./ProductQuestion";
import ProductDiscussionForm from "./ProductDiscussionForm";
import ProductAnswerForm from "./ProductAnswerForm";

const ProductDiscussion = (props) => {
  // For answer form dialog
  const [open, setOpen] = useState(false);
  const [questionId, setQuestionId] = useState(null);

  const handleClickOpen = (e, id) => {
    e.preventDefault();
    setQuestionId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let renderQuestions;
  if (props.questions.length === 0) {
    renderQuestions = <h5>No questions to show</h5>;
  } else {
    renderQuestions = props.questions.map((question) => (
      <ProductQuestion
        key={question._id}
        question={question}
        handleClickOpen={handleClickOpen}
      />
    ));
  }

  return (
    <Box mt={4} mb={18} sx={{ borderRadius: "8px" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "600", marginBottom: 2 }}>
            Product Discussion
          </Typography>
          <ProductDiscussionForm />

          <Box mt={4}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Previously asked questions
            </Typography>
            {renderQuestions}
          </Box>
        </CardContent>
        <ProductAnswerForm
          open={open}
          handleClose={handleClose}
          questionId={questionId}
        />
      </Card>
    </Box>
  );
};

export default ProductDiscussion;
