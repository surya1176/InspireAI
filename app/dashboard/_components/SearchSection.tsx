import { Search } from "lucide-react";
import React from "react";

function SearchSection({ onSearchInput }: any) {
  return (
    <div className="p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-500 flex flex-col justify-center items-center text-white">
      <h2 className="text-3xl font-bold text-center">Browse all Templates</h2>
      <p className="pt-2">What would you like to create today?</p>
      <div className="w-full flex justify-center">
        <div className="flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[80%] sm:w-[60%]">
          <Search className="text-primary" />
          <input
            type="text"
            onChange={(event) => onSearchInput(event.target.value)}
            className="bg-transparent w-full rounded-lg outline-none text-black"
            placeholder="Search for templates"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
