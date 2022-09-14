import React from 'react';
import { FaSearch } from 'react-icons/fa'
import './search-bar.css'

const SearchBar = () => {
    return (
        <div className='search-bar'>
            <input type="text" name="search" className='search-input' autoComplete='off' placeholder='#Explore' />
            <button className='btn search-btn'><FaSearch /></button>
        </div>
    )
};
export default SearchBar;