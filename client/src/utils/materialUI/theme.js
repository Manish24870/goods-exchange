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
    },
    typography: {
        fontFamily: "Sora",
        fontSize: 14,
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
