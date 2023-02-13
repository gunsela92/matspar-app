import React, {useEffect, useState} from "react";
import Image from "next/image";
import SearchBar from "@/Components/SearchBar";
import SearchResults from "@/Components/SearchResults";
import {getStorage} from "@/helpers/storageHelper";

const HeadBar = ({setProducts, productList}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestionResults, setSuggestionResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchFocus = (value) => {
    setIsSearchFocused(value);
  }

  useEffect(() => {
    const storageValues = getStorage("recentSearches")
    if (storageValues && storageValues.length > 0 && showSearchResults) {
      setRecentSearches(storageValues)
    }
  }, [showSearchResults]);

  useEffect(() => {
    if (isSearchFocused && !showSearchResults) {
      setShowSearchResults(true);
    } else {
      if (suggestionResults.length === 0 && recentSearches.length === 0 && showSearchResults && !isSearchFocused) {
        setShowSearchResults(false);
      }
    }
  }, [isSearchFocused, showSearchResults, suggestionResults, recentSearches]);

  const handleSelectResult = (value) => {
    setProducts(value);
    setShowSearchResults(false);
  }

  useEffect(() => {
    setSuggestionResults([]);
  }, [showSearchResults]);

  const handleClickMenuButton = () => {
    if (showSearchResults) {
      setShowSearchResults(false);
    }
  }

  return (
    <div className={`headBar${isSearchFocused ? " menuHidden" : ""}`}>
      <Image src={"/Menu.svg"} alt={"Menu"} width={24} height={24} priority className={"menuIcon"} onClick={handleClickMenuButton} />
      <SearchBar handleSearchFocus={handleSearchFocus} setSuggestionResults={(val) => setSuggestionResults(val)} />
      <SearchResults show={showSearchResults} suggestionResults={suggestionResults} setProducts={handleSelectResult} productList={productList} recentSearches={recentSearches} setRecentSearches={(val) => setRecentSearches(val)} />
    </div>
  );
};

export default HeadBar;
