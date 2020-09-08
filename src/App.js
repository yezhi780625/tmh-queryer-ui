import React, { useEffect } from "react";
import {
  Backdrop,
  CircularProgress,
  Typography,
  Button,
  Toolbar,
  AppBar,
  Paper,
} from "@material-ui/core";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import useInstance, { STATE } from "./useInstance";
import { css } from "emotion";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00adef",
      contrastText: "#FFF",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Microsoft JhengHei"`,
  },
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  const classes = useStyles();
  const { load, state, data } = useInstance();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className={css`
          height: 100%;
          width: 100%;
        `}
      >
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h4">
              台南市立醫院 張炯宏醫生 門診預約
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          className={css`
            margin-top: 64px;
            padding: 16px;
          `}
        >
          <Button
            className={css`
              margin-bottom: 16px;
            `}
            color="primary"
            onClick={load}
            variant="contained"
          >
            Refresh
          </Button>
          {STATE.LOADING === state && (
            <Backdrop className={classes.backdrop} open>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          {STATE.LOADING === state && (
            <div
              className={css`
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: 8px;
              `}
            >
              {data.map(({ date, noon, href }) => (
                <Paper key={`${date} ${noon}`}>
                  <Typography>{date}</Typography>
                  <Typography>{noon}</Typography>
                  <Button component="a" href={href}>
                    Go
                  </Button>
                </Paper>
              ))}
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
