import React, {useCallback, useEffect, useState} from "react";
import {getStorage, removeStorage, setStorage} from "@/helpers/storageHelper";
import Image from "next/image";

const SearchResults = ({show, recentSearches, setRecentSearches,  suggestionResults, setProducts}) => {
  const [activeResult, setActiveResult] = useState(-1);

  const handleClearSearch = (value) => {
    if (value === "all") {
      setRecentSearches([])
      removeStorage("recentSearches")
    } else {
      const newRecentSearches = recentSearches.filter(item => item !== value)
      setRecentSearches(newRecentSearches)
      setStorage("recentSearches", newRecentSearches)
    }
  }

  const handleKeyDown = useCallback((event) => {
    const storageValues = getStorage("recentSearches")
    if (storageValues.length > 0) {
      if (event.key === "ArrowDown") {
        if (activeResult < storageValues.length - 1) {
          setActiveResult(activeResult + 1)
        }
      } else if (event.key === "ArrowUp") {
        if (activeResult > 0) {
          setActiveResult(activeResult - 1)
        }
      }
    }
    if (event.key === "Enter") {
      if (activeResult > -1) {
        const value = storageValues[activeResult]
        handleSelectResult(value)
      }
    }
  }, [activeResult]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  });

  const handleSelectResult = async (value) => {
    try {
      const response = await fetch("api/product-search", {
        method: "POST",
        body: {
          search: value
        }
      });
      const data = await response.json();
      setProducts(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!show && suggestionResults?.length === 0) {
      setActiveResult(-1)
    }
  }, [show, suggestionResults])

  return (
    <div className={`searchContainer${show ? " active" : ""}`}>
      {recentSearches?.length > 0 && suggestionResults?.length === 0 && (
        <div className={"recentSearches"}>
          <div className={"recentSearchesTitleWrapper"}>
            <h3 className={"recentSearches-title"}>Recent searches</h3>
            <div className={"recentSearchesClear"} onClick={() => handleClearSearch("all")}>Clear all</div>
          </div>
          <div className={"recentSearchesList"}>
            {recentSearches.map((item, index) => (
              <div className={`recentSearchesItem ${activeResult === index ? "active" : ""}`} key={index}>
                <div className={"recentSearchesItemText"} onClick={() => handleSelectResult(item)}>{item}</div>
                <Image className={"recentSearchesItemClear"} onClick={() => handleClearSearch(item)} src={"/Close.svg"} alt={"Menu"} width={18} height={18}/>
              </div>
            ))}
          </div>
        </div>
      )}
      {suggestionResults?.length > 0 && (
        <div className={"recentSearches"}>
          <div className={"recentSearchesTitleWrapper"}>
            <h3 className={"recentSearches-title"}>Popular searches</h3>
          </div>
          <div className={"recentSearchesList"}>
            {suggestionResults.map((item, index) => (
              <div className={`recentSearchesItem ${activeResult === index ? "active" : ""}`} key={index}>
                <div className={"recentSearchesItemText"} onClick={() => handleSelectResult(item)}>{item?.text}</div>
                <Image className={"recentSearchesItemClear"} onClick={() => handleClearSearch(item)} src={"/Search.svg"} alt={"Search"} width={18} height={18}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
