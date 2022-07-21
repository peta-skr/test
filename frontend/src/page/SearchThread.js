import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const SearchThread = ({ setResults }) => {
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleChange = (newValue) => {
    console.log(newValue._d);
    setStartDate(newValue);
  };

  const navigate = useNavigate();

  const threadSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      "http://localhost:5000/thread/search/both",
      {
        params: {
          keyword: keyword,
          date: startDate,
        },
      }
    );
    console.log(response);
    setResults(response.data);
    navigate("/result");
  };

  return (
    <form onSubmit={(e) => threadSearch(e)}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <DesktopDatePicker
              label="Date desktop"
              value={startDate}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
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
