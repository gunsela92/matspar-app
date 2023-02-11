import React, {useState} from "react";
import Image from "next/image";
import {getStorage, setStorage} from "@/helpers/storageHelper";
import { Raleway } from "@next/font/google"

const raleWay = Raleway({ weight: ["500"],subsets: ["latin"] })

const SearchBar = ({handleSearchFocus, setSuggestionResults}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      handleLastSearch();
      const response = await fetch(`api/search?searchValue=${searchValue}`);
      const data = await response.json();
      setSuggestionResults(data.suggestions);
    } catch (err) {
      console.log(err)
    }
  }

  const handleLastSearch = () => {
    const storageValues = getStorage("recentSearches")
    if (storageValues && storageValues.length > 0) {
      if (storageValues.includes(searchValue)) { // if searchValue is already in storageValues move it to the top
        const index = storageValues.indexOf(searchValue);
        storageValues.splice(index, 1);
        const newStorageValues = [searchValue, ...storageValues];
        setStorage("recentSearches", newStorageValues)
      } else {
        const newStorageValues = [...storageValues, searchValue];
        setStorage("recentSearches", newStorageValues)
      }
    } else {
      setStorage("recentSearches", [searchValue])
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <form className={"searchInputWrapper"} onSubmit={handleSubmit}>
      <Image src={"/Search.svg"} alt={"Search"} className={"searchIcon"} width={20} height={20} priority />
      <input type={"text"} placeholder={"Search Product"} className={raleWay.className + " searchInput"} value={searchValue} onChange={handleChange} onFocus={() => handleSearchFocus(true)} onBlur={() => handleSearchFocus(false)} />
    </form>
  );
};

export default SearchBar;
