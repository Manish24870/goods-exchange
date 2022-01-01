import React from "react";
import { Box, Typography, Button } from "@mui/material";
// import { QuestionAnswer, QuestionMark } from "@mui/icons-material";

const ProductQuestion = (props) => {
    return (
        <Box mb={3} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="p" sx={{ fontSize: "1.07em", marginBottom: 1 }}>
                {"Q: " + props.question.ques}
                <Button
                    size="small"
                    variant="outlined"
                    sx={{ marginLeft: 2, textTransform: "none" }}
                    // onClick={handleClickOpen}
                >
                    Answer
                </Button>
            </Typography>
            <Typography variant="p">
                {props.question.ans ? `A: ${props.question.ans}` : null}
            </Typography>
        </Box>
    );
};

export default ProductQuestion;
