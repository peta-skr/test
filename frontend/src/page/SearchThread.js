import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  FormControl,
  FormControlLabel,
  Select,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const SearchThread = ({ setResults }) => {
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [check, setCheck] = useState({ keyword: true, date: false });

  const handleChange = (newValue) => {
    const v = `${newValue._d.getFullYear()}-${
      newValue._d.getMonth() + 1
    }-${newValue._d.getDate()}`;
    setStartDate(v);
  };

  const navigate = useNavigate();

  const threadSearch = async (e) => {
    e.preventDefault();

    //checkの値によってurlとパラメータの値を変化
    let url;
    let params;
    if (check.keyword && check.date) {
      url = "http://localhost:5000/thread/search/both";
      params = {
        keyword: keyword,
        date: startDate,
      };
    }

    if (check.keyword) {
      url = "http://localhost:5000/thread/search";
      params = {
        keyword: keyword,
      };
    }

    if (check.date) {
      url = "http://localhost:5000/thread/search/date";
      params = {
        date: startDate,
      };
    }

    const response = await axios.get(url, {
      params: params,
    });
    console.log(response);
    setResults(response.data);
    navigate("/result");
  };

  useEffect(() => {
    console.log(check);
  }, [check]);

  const handleLabel = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    name === "keyword"
      ? setCheck({ ...check, keyword: checked })
      : setCheck({ ...check, date: checked });
  };

  return (
    <form onSubmit={(e) => threadSearch(e)}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl>
              <FormControlLabel
                onChange={(e) => handleLabel(e)}
                control={<Checkbox name="keyword" />}
                label="Keyword"
              />
              <TextField
                type="text"
                name="keyword"
                placeholder="キーワード"
                autoComplete="off"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormControlLabel
                onChange={(e) => handleLabel(e)}
                control={<Checkbox name="date" />}
                label="date"
              />
              <DesktopDatePicker
                label="Date desktop"
                value={startDate}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <Select label="Age" onChange={handleChange}></Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default SearchThread;
