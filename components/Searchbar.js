import React from "react";
import { Input, InputGroup, Flex, Center, Select } from "@chakra-ui/react";

function SearchBar({
  onSearch,
  onPriceChange,
  onTagChange,
  onSortChange,
  searchQuery,
  selectedPrice,
  selectedTag,
  selectedSort,
}) {
  return (
    <Flex justifyContent="center" mt={2}>
      <Center>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search for dorms"
            // value={searchQuery}
            // onChange={(e) => onSearch(e.target.value)}
            w="600px"
            data-testid="search-input"
          />
        </InputGroup>

        <Select
          ml={2}
          // onChange={(e) => onTagChange(e.target.value)}
          data-testid="Category"
          // value={selectedTag}
        >
          <option value="">Category</option>
          <option value="Freshmen">Freshman</option>
          <option value="Main">Main</option>
          <option value="Highland Quad">Highland Quad</option>
        </Select>
      </Center>
    </Flex>
  );
}

export default SearchBar;
