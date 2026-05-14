import { createTheme } from "@mui/material/styles";

export const monospaceFontFamily =
  '"JetBrains Mono", "SFMono-Regular", "SF Mono", ui-monospace, monospace';

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0969da",
      dark: "#0550ae",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#57606a",
    },
    error: {
      main: "#cf222e",
    },
    background: {
      default: "#f6f8fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#1f2328",
      secondary: "#57606a",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f6f8fa",
        },
        code: {
          fontFamily: monospaceFontFamily,
        },
        "button, input, textarea, select": {
          font: "inherit",
        },
      },
    },
  },
});
