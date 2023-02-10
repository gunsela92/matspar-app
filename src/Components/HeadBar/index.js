import React, {useState} from 'react';
import Image from 'next/image';
import SearchBar from "@/Components/SearchBar";
import SearchResults from "@/Components/SearchResults";

const HeadBar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(true);
  const [suggestionResults, setSuggestionResults] = useState([]);

  const handleSearchFocus = (value) => {
    setIsSearchFocused(value);
  }

  return (
    <div className={"headBar"}>
      <Image src={"/Menu.svg"} alt={"Menu"} width={24} height={24} priority />
      <SearchBar handleSearchFocus={handleSearchFocus} setSuggestionResults={(val) => setSuggestionResults(val)} />
      <SearchResults show={isSearchFocused} suggestionResults={suggestionResults} />
    </div>
  );
};

export default HeadBar;
