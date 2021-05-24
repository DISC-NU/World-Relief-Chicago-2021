import React from 'react';
import { Input } from './Input';

// List of all input fields to filter by (LHS of app screen)
export const InputList = ({options,fields, jobs, setFilteredJobs, query, setQuery}) => {

  console.log(options);
  

  function parseLimit (limit) {
    let limitArr = limit.split(' ');
    return limitArr[0] * 3600 + limitArr[2] * 60
  }
  console.log(parseLimit("3 hrs 2 min"))

    return (
      <React.Fragment>
        <React.Fragment>
        {fields.map((field, index) => (
          <Input id={index} options={options[index]} field={field} query={query} setQuery={setQuery}/>
        ))}
        </React.Fragment>       
      </React.Fragment>
    );
  }