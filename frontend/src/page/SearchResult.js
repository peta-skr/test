import React from "react";
import { Link as RoutesLink } from "react-router-dom";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  Heading,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";

const SearchResult = ({ results }) => {
  return (
    <div>
      {results.map((thread) => (
        <Box maxW="sm" p="5" m="3" borderWidth="1px" borderRadius="lg">
          <RoutesLink to={"/thread?threadId=" + thread.id}>
            <Text fontSize="lg" key={thread.id}>
              {thread.title}
            </Text>
            <Text fontSize="lg">{thread.createdAt}</Text>
          </RoutesLink>
        </Box>
      ))}
    </div>
  );
};

export default SearchResult;
