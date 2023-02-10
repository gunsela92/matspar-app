import React from 'react';
import Image from 'next/image';
import SearchBar from "@/Components/SearchBar";

const HeadBar = () => {
  return (
    <div className={"headBar"}>
      <Image src={"/Menu.svg"} alt={"Menu"} width={24} height={24} priority />
      <SearchBar />
    </div>
  );
};

export default HeadBar;
