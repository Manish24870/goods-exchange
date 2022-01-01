import React from "react";
import { Box, Card, CardContent, Typography, TextField, Grid, Button } from "@mui/material";

const ProductQuestion = (props) => {
    return (
        <Box key={"el.question"} mb={3} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="p" color="secondary" sx={{ fontSize: "1.2em", marginBottom: 1 }}>
                Q. {"el.question"}
                <Button
                    size="small"
                    variant="outlined"
                    sx={{ marginLeft: 2, textTransform: "none" }}
                    // onClick={handleClickOpen}
                >
                    Answer
                </Button>
            </Typography>
            <Typography variant="p" color="primary">
                A. {"el.answer"}
            </Typography>
        </Box>
    );
};

export default ProductQuestion;
