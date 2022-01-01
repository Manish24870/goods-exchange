import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import ProductQuestion from "./ProductQuestion";
import ProductDiscussionForm from "./ProductDiscussionForm";

const ProductDiscussion = (props) => {
    let renderQuestions;
    if (props.questions.length === 0) {
        renderQuestions = <h5>No questions to show</h5>;
    } else {
        renderQuestions = props.questions.map((question) => (
            <ProductQuestion key={question._id} question={question} />
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
            </Card>
        </Box>
    );
};

export default ProductDiscussion;
