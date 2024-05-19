import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import styles from '../styles/Searchbar.module.css';

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const debouncedSearch = useCallback(_.debounce(query => {
        onSearch(query);
    }, 300), [onSearch]);

    const handleInputChange = (e) => {
        const { value } = e.target;
        console.log('Input change:', value);
        setInput(value);
        debouncedSearch(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(typeof onSearch === 'function') {
          onSearch(input);
        }        
      };

      
    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <input
                type="text"
                placeholder="Search posts..."
                value={input}
                onChange={handleInputChange}
                className={styles.searchInput}
            />
            <button type="submit" className="btn-sm btn">Search</button>
        </form>
    );
};

export default SearchBar;
