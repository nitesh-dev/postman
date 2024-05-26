import SearchIcon from "../icon/SearchIcon";

export default function SearchBar() {
  return (
    <div className="search-bar">
      <SearchIcon />
      <input type="text" placeholder="Search" />
    </div>
  );
}
