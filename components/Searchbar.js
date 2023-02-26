
const SearchBar = () => {

    const handleCloseSearch = () => {
        let searchbar = document.querySelector('.searchbar');
        let searchwrapper = document.querySelector('.search-wrapper');
        searchbar.style.width = '0';
        searchwrapper.style.opacity = '0';
    }

    return (
        <aside className="searchbar d-flex justify-content-center align-items-center">
            <div className="search-wrapper">
                <div className="search-container">
                    <div className="input-group input-group-lg">
                        <input className="form-control me-2" type="text" placeholder="search by product name" />
                        <button className="btn btn-dark" type="button" style={{backgroundColor: '#3c0000'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <button className="btn btn-lg position-absolute fw-bolder search-close" type="button" style={{top: 20, right: 20, color: '#3c0000'}} onClick={handleCloseSearch}>X Close</button>
            </div>
        </aside>
    )
}

export default SearchBar