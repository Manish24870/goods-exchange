import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  DialogContent,
  CardMedia,
  Grid,
} from "@mui/material";

const ProductExchangeItem = (props) => {
  return (
    <Button
      size="small"
      variant="outlined"
      onClick={props.onExchangeItemSelect}
      sx={{
        width: "90%",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 2,
      }}
      style={{
        border: "2px solid",
      }}
    >
      <DialogContent>
        <Box>
          <Card>
            <Grid container>
              <Grid item xs={5}>
                <CardMedia
                  component="img"
                  // height="100"
                  image={
                    process.env.REACT_APP_BASE_IMAGE_URL +
                    props.product.images[0].url
                  }
                  alt={props.product.name}
                />
              </Grid>
              <Grid item xs={7}>
                <CardContent>
                  <Box>
                    <Typography variant="p" sx={{ fontSize: "1.1em" }}>
                      {props.product.name}
                    </Typography>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </DialogContent>
    </Button>
  );
};

export default ProductExchangeItem;
