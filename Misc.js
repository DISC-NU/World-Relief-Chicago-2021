// Miscellaneous bits and pieces of code that we didn't use

/* const englishMapping2 = {
  "none": 0,
  "basic": 1,
  "intermediate": 2,
  "advanced": 3
}
const shiftMapping2 = {
  "day": 0, 
  "afternoon": 1,
  "night": 2
}
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
} */