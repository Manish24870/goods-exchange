import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#4D58B2",
            contrastText: "#fff",
        },
        secondary: {
            main: "#FF5F5F",
            contrastText: "#fff",
        },
        error: {
            main: "#FF5F5F",
        },
        success: {
            main: "#E3A6F6",
        },
    },
    typography: {
        fontFamily: "Sora",
        fontSize: 14,
        caption: {
            fontSize: "0.83rem",
        },
    },
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: "lg",
            },
        },
    },
});

export default theme;
