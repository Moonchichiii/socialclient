import React, { useState, useCallback } from 'react';
import _ from 'lodash';

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState('');

    
    const debouncedSearch = useCallback(_.debounce(query => {
        console.log('Debounced search:', query);
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
        console.log('Form submitted:', input);
        onSearch(input);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search posts..."
                value={input}
                onChange={handleInputChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
