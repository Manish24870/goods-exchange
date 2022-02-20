import React from "react";
import moment from "moment";

import { Box, Rating, Typography } from "@mui/material";

const ReceivedReviews = (props) => {
  let renderReviews = props.reviews.map((review) => {
    return (
      <Box key={review._id} mt={2}>
        <Box component="form" noValidate autoComplete="off">
          <Box>
            <Typography variant="h6">
              {review.reviewText ? review.reviewText : null}
            </Typography>

            <Rating
              name="reviewNumber"
              value={Number(review.reviewNumber)}
              max={10}
            />
            <Typography variant="p" sx={{ display: "block", opacity: "0.9" }}>
              {moment(review.reviewedAt).format("MMM Do YYYY, h:mm a")}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  });

  return (
    <Box mt={1} mb={7}>
      <Typography mt={2} mb={3} variant="h5" sx={{ fontWeight: 500 }}>
        Received Reviews
      </Typography>
      {renderReviews}
    </Box>
  );
};

export default ReceivedReviews;
