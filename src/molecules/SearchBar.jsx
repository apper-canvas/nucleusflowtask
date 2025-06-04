import React from 'react';
import Input from '../atoms/Input';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="flex-1 max-w-xl mx-4 sm:mx-8">
    <Input
      type="text"
      placeholder="Search tasks... (Press / to focus)"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      iconName="Search"
      className="pl-10"
    />
  </div>
);

export default SearchBar;