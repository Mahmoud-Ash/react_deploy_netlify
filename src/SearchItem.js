const SearchItem = ({SearchItem, setSearchItem}) => {
  return (
    <form className="searchForm" onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="search">Search</label>
        <input 
            type="text"
            placeholder="Search items"
            id="search"
            role="searchbox"
            value={SearchItem}
            onChange={(e)=>setSearchItem(e.target.value)}
        />
    </form>
  )
}

export default SearchItem