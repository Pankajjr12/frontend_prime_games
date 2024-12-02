import { ThemeProvider, createTheme } from "@mui/material";

const customTheme = createTheme({
    palette:{
        mode:"light",
        primary:{
            main:"#AE1438"
        },
        secondary:{
            main:"#A2D64A"
        }
    }
})

export default customTheme;