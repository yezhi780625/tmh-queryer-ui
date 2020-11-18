import React, { memo, useState } from "react";
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  useEventCallback,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { addDays } from "date-fns/esm";
import { css } from "emotion";

const Search = ({ onSubmit }) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(null);
  const [days, setDays] = useState([4]);
  const submit = () => {
    onSubmit(fromDate, toDate, days);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <DatePicker
            size="small"
            autoOk
            disablePast
            value={fromDate}
            onChange={setFromDate}
            minDate={new Date()}
            format="yyyy/MM/dd"
            variant="inline"
            inputVariant="outlined"
            label="Start Date"
          />
        </Grid>
        <Grid item>
          <DatePicker
            size="small"
            autoOk
            disablePast
            value={toDate}
            onChange={setToDate}
            minDate={new Date()}
            maxDate={addDays(new Date(), 28)}
            format="yyyy/MM/dd"
            variant="inline"
            inputVariant="outlined"
            label="End Date"
          />
        </Grid>
        <Grid
          item
          className={css`
            min-width: 375px;
          `}
        >
          <TextField
            size="small"
            select
            variant="outlined"
            value={days}
            onChange={useEventCallback((e) => setDays(e.target.value))}
            SelectProps={{
              multiple: true,
              MenuProps: {
                getContentAnchorEl: null,
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
              },
            }}
            label="限定週間"
            fullWidth
          >
            <MenuItem value={0}>禮拜日</MenuItem>
            <MenuItem value={1}>禮拜一</MenuItem>
            <MenuItem value={2}>禮拜二</MenuItem>
            <MenuItem value={3}>禮拜三</MenuItem>
            <MenuItem value={4}>禮拜四</MenuItem>
            <MenuItem value={5}>禮拜五</MenuItem>
            <MenuItem value={6}>禮拜六</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={submit}>
            查詢
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default memo(Search);
