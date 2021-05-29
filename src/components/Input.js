import React, { useEffect } from 'react';

// Input field component (english, location, shift, etc.)
export const Input = ({options, field, query, setQuery}) => {
    return (
      <React.Fragment>
        <h1 className="w-5/6 mb-5 text-2xl">
          {field}
        </h1>
        <div className="flex flex-wrap justify-start w-5/6">
          {options.map((option, index) => 
          (<div className="flex border flex-col justify-center align-center items-center w-1/4 p-2">
              {field === "Matching Schema"
              ?           // Dispatch based on whether the field is the "Matching Schema" ...
              <input
                // checked={((query[field] != null) && (query[field].includes(option))) ? "checked" : undefined}
                id={index}
                name="matchingSchema"
                type="checkbox"
                onChange={() => {
                  if (query == null || query[field] == null || !query[field].includes(option)) {
                    let newArr = [option];
                    let newQuery = {... query};
                    newQuery[field] = newArr;
                    setQuery(newQuery);
                  } else if (query[field].includes(option)) {
                    let newArr = query[field].filter((value) => value != option)
                    let newQuery = {... query};
                    newQuery[field] = newArr;
                    setQuery(newQuery)
                  } 
                }}
              />
              :       // ... or any other parameter
              <input 
                // checked={((query[field] != null) && (query[field].includes(option))) ? "checked" : undefined}
                type="checkbox"
                onChange={() => {
                  if (query == null || query[field] == null || !query[field].includes(option)) {
                    let newArr;
                    if (query[field] != null) {
                      newArr = query[field].concat([option]);
                    } else {
                      newArr = [option];
                    }
                    let newQuery = {... query};
                    newQuery[field] = newArr;
                    setQuery(newQuery);
                  } else if (query[field].includes(option)) {
                    let newArr = query[field].filter((value) => value != option)
                    let newQuery = {... query};
                    newQuery[field] = newArr;
                    setQuery(newQuery)
                  } 
                }}
              />
              }
              
              <h4>{option}</h4>
          </div>))}
        </div>
        <br></br>
      </React.Fragment>
    );
  }

  /*
  const Checkboxes = ({shifts, setShifts}) => {
  //MAKE MORE GENERALIZABLE FOR ALL INPUT FIELDS
  const toggleCheckbox = changeEvent => {
    const { name } = changeEvent.target;
    let newShifts = [...shifts]
    if (newShifts.includes(name)) {
      newShifts.splice(newShifts.indexOf(name), 1);
    } else {
      newShifts.push(name);
    }
    setShifts(newShifts);
  };

  return (
    <React.Fragment>
      <h1 className="w-5/6 mb-5 text-2xl">
        Shifts
      </h1>
      {Object.keys(shiftMapping2).map((option) => (
        <label>
          <input
            type="checkbox"
            name={option}
            value={option}
            checked={shifts[option]}
            onChange={toggleCheckbox}
            className="form-check-input"
          />
          {option}
        </label>
      ))}
    </React.Fragment>
  )
}

*/