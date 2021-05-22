import React from 'react';

// Input field component (english, location, shift, etc.)
export const Input = ({options, field, query, setQuery}) => {
  console.log(options);
    return (
      <React.Fragment>
        <h1 className="w-5/6 mb-5 text-2xl">
          {field}
        </h1>
        <div className="flex flex-wrap text-left">
        {options.map((option) => 
        (<div style={{marginRight:10}}><h4>{option}</h4>
        <input 
          /*className="w-5/6 h-16 border rounded-2xl mb-10" 
          onChange={event => {
            let queryCopy = {...query};
            queryCopy[field] = event.target.value;
            setQuery(queryCopy);
          }}
          value={query[field]}
          placeholder={field}*/
          type="checkbox"
        />
        </div>))}
        </div>
       
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