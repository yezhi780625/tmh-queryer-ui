import React from "react";
import {
  Backdrop,
  CircularProgress,
  Typography,
  Toolbar,
  AppBar,
  Paper,
  CssBaseline,
  useMediaQuery,
  IconButton,
  Grid,
} from "@material-ui/core";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Launch } from "@material-ui/icons";
import useInstance, { STATE } from "./useInstance";
import { css } from "emotion";
import Search from "./components/Search";
import { parseISO } from "date-fns/esm";

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

const options = {
  weekday: "narrow",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

function App() {
  const classes = useStyles();
  const isSmall = useMediaQuery("(max-width:600px)");
  const { load, state, data } = useInstance();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className={css`
          height: 100%;
          width: 100%;
        `}
      >
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant={isSmall ? "h6" : "h4"}>
              台南市立醫院 張炯宏醫生 門診預約
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          className={css`
            padding: 80px 16px 16px;
          `}
        >
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Search onSubmit={load} />
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                {STATE.INIT === state && (
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    className={css`
                      min-height: 360px;
                    `}
                  >
                    <Grid item>
                      <Typography>請先查詢</Typography>
                    </Grid>
                  </Grid>
                )}
                {STATE.INIT !== state && data.length === 0 && (
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    className={css`
                      min-height: 360px;
                    `}
                  >
                    <Grid item>
                      <Typography>沒有可預約的時段</Typography>
                    </Grid>
                  </Grid>
                )}
                {data.map(({ date, noon, href }) => (
                  <Grid item key={`${date} ${noon}`}>
                    <Paper
                      className={css`
                        padding: 8px 12px;
                        display: flex;
                        width: fit-content;
                        align-items: center;
                        & > * {
                          margin-right: 8px;
                        }
                      `}
                    >
                      <Typography>
                        {parseISO(date).toLocaleDateString("zh-TW", options)}
                      </Typography>
                      <Typography>{noon}</Typography>
                      <IconButton
                        component="a"
                        href={href}
                        target="_blank"
                        color="primary"
                        variant="outlined"
                        size="small"
                      >
                        <Launch />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          {STATE.LOADING === state && (
            <Backdrop className={classes.backdrop} open>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
