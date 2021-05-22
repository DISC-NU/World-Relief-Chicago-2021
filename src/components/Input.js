import React from 'react';

// Input field component (english, location, shift, or industry field)
export const Input = ({field, query, setQuery}) => {
    return (
      <React.Fragment>
        <h1 className="w-5/6 mb-5 text-2xl">
          {field}
        </h1>
        <input 
          className="w-5/6 h-16 border rounded-2xl mb-10" 
          onChange={event => {
            let queryCopy = {...query};
            queryCopy[field] = event.target.value;
            setQuery(queryCopy);
          }}
          value={query[field]}
          placeholder={field}
          type="text"
        />
      </React.Fragment>
    );
  }