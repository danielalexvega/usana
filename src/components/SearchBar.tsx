import { FC } from "react";

const SearchBar: FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search Products"
        className="w-full pl-10 pr-12 py-2 border border-gray-400 rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-white"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <button className="h-6 w-6 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-600">
          <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
