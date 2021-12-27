import React from "react";
import {
    Box,
    Grid,
    TextField,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Button,
} from "@mui/material";

const NewProductForm = () => {
    return (
        <Box mt={2} component="form" noValidate autoComplete="off">
            <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column" }}>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <TextField fullWidth label="Product name" variant="standard" />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <TextField fullWidth label="Product type" variant="standard" />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid item xs={4}>
                            <FormControl sx={{ width: "100%", marginRight: 0 }} variant="outlined">
                                <InputLabel id="condition-select-label">Condition</InputLabel>
                                <Select
                                    labelId="condition-select-label"
                                    defaultValue=""
                                    label="Condition"
                                >
                                    <MenuItem value="brand-new">Brand New</MenuItem>
                                    <MenuItem value="lightly-used">Lightly Used</MenuItem>
                                    <MenuItem value="heavily-used">Heavily Used</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <TextField
                                sx={{ width: "30%", marginRight: 2 }}
                                label="Used For"
                                variant="standard"
                            />

                            <FormControl sx={{ width: "40%" }} variant="standard">
                                <InputLabel id="used-select-label">Length</InputLabel>
                                <Select
                                    defaultValue="months"
                                    labelId="used-select-label"
                                    label="Used For"
                                >
                                    <MenuItem value="months">Months</MenuItem>
                                    <MenuItem value="years">Years</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid item xs={4}>
                            <FormControl sx={{ width: "100%", marginRight: 8 }} variant="outlined">
                                <InputLabel id="warranty-select-label">Warranty</InputLabel>
                                <Select
                                    labelId="warranty-select-label"
                                    defaultValue=""
                                    label="Warranty"
                                >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <TextField
                                sx={{ width: "30%", marginRight: 2 }}
                                label="Expires In"
                                variant="standard"
                            />

                            <FormControl sx={{ width: "40%" }} variant="standard">
                                <InputLabel id="used-select-label">Length</InputLabel>
                                <Select
                                    defaultValue="months"
                                    labelId="used-select-label"
                                    label="Used For"
                                >
                                    <MenuItem value="months">Months</MenuItem>
                                    <MenuItem value="years">Years</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <TextField fullWidth label="Additionals" variant="standard" />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <TextField fullWidth label="Exchange With" variant="standard" />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <TextField fullWidth label="Phone Number" variant="standard" />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 2 }}>
                    <TextField
                        multiline
                        fullWidth
                        rows={3}
                        label="Description"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: 6 }}>
                    <Button variant="contained" size="large">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewProductForm;
