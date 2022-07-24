import React from "react";
import { Link as RoutesLink } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const SearchResult = ({ results }) => {
  return (
    <div>
      {results.map((thread) => (
        <Box maxW="sm" p="5" m="3" borderWidth="1px" borderRadius="lg">
          <RoutesLink to={"/thread?threadId=" + thread.id}>
            <Typography fontSize="lg" key={thread.id}>
              {thread.title}
            </Typography>
            <Typography fontSize="lg">{thread.createdAt}</Typography>
          </RoutesLink>
        </Box>
      ))}
    </div>
  );
};

export default SearchResult;
