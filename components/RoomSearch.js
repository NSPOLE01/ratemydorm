import React from "react";
import { Input, InputGroup, Flex, Center, Select, Button } from "@chakra-ui/react";

function RoomSearch({
    onSearch,
    searchQuery,
}) {
  return (
    <Flex justifyContent="center" mt={2}>
      <Center>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search for a specific room!"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            w="600px"
            data-testid="search-input"
          />
        </InputGroup>
      </Center>
    </Flex>
  );
}

export default RoomSearch;
