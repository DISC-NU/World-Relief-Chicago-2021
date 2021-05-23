import './App.css';
import React, { useState, useEffect } from 'react';
import { CSVToJSON } from './components/FileUpload';
import { JobDetailModal } from './components/JobDetailModal';
import { InputList } from './components/InputList';
import { JobList } from './components/JobList';
// This is needed when we uncomment the useEffect
// import { Loader } from "@googlemaps/js-api-loader";


// Origin and Destination are Just Specific Address Strings
// function GetTime(origin, destination) {
  
// }

// TENTATIVELY: 
// Company Name: String
// English Level: Integer
// Location: Array of Strings 
// Shift: Array of Integers 
// Industry: String
// Notes: String
// Shifts: [0, 1, 2] for Day Afternoon Night
// Intermediate English = 2

// Bi-directional mapping from english level, shift # to description 
const englishMapping2 = {
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

// Checkbox component for shifts
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
 
// Main app: encapsulates input fields, (filtered) job list, & modals for individual jobs

function App() {

  // useEffect(()=> {
  //   if (service == null) {
  //     const loader = new Loader({
  //       apiKey: process.env.REACT_APP_API_KEY,
  //       version: "weekly"
  //     });
  //     loader.load().then(() => {
  //       setService(new window.google.maps.DistanceMatrixService());
  //     })
  //   } else {
  //     let origin = '2110 W Greenleaf Ave, Chicago, IL 60645'
  //     let dest = 'Chinatown, Chicago, IL 60616'
  //   GetTime(origin, dest)
  //   }
  // },[service])

  /*
  function GetTime(origin, dest) {
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [dest],
      travelMode: 'TRANSIT'
    }, (response, status) => {if (status === "OK") console.log(response)})
  }
  */
  
  /*
    (1) Specific job we have clicked on from the job list on the RHS
    (2) Query based on inputs on the LHS (i.e. tells us what parameters to filter by)
        |__ Default matching schema is that all fields must match
    (3) List of all jobs < SEE NOTE AT TOP OF FILE >
    (4) List of jobs, filtered down by query in (2)
    (5) Fields to filter jobs by
  */

  const [selected, setSelected] = useState(null); // (1)
  const [query, setQuery] = useState({
    'Matching Schema': ["Match All Fields (Default)"]
  }); // (2)
  const [jobs, setJobs] = useState([]); // (3)
  const [filteredJobs, setFilteredJobs] = useState([]); // (4)
  const fields = ['Matching Schema', 'English', 'Shifts', 'Billingual', 'Weekend']; // (5)
  const options = [
    ['Match All Fields (Default)', 'Match At Least One Field'], 
    ['None', 'Basic', 'Intermediate', 'Advanced'],
    ['Morning','Afternoon','Night'], 
    ['Yes'],
    ['Yes']
  ]; //TODO Locations
  useEffect(() => {
    console.log("THIS THE QUERY: ", query);
  },[query])

  return (
    <React.Fragment>
      {selected ? 
        <div className="w-screen h-screen flex items-center justify-center">
          <JobDetailModal selected={selected} setSelected={setSelected}></JobDetailModal>
        </div>
         :
        <div className="w-screen h-screen">
            <React.Fragment>
              <br></br>
              <div className="w-auto h-auto font-sans text-6xl flex flex-row justify-center items-center">
                World Relief Chicago Job Match
              </div>
              <CSVToJSON setJobs={setJobs} setFilteredJobs={setFilteredJobs}></CSVToJSON>
              <div className="w-full h-full flex justify-around flex-row items-center">
                  <div className="w-5/12 h-full border rounded-lg shadow-2xl flex flex-col items-center justify-start">
                    <br></br>
                    <br></br>
                    <InputList 
                      options={options}
                      fields={fields} 
                      jobs={jobs}
                      setFilteredJobs={setFilteredJobs}
                      query={query} 
                      setQuery={setQuery}
                    />
                  </div>
                  <div 
                    className="w-6/12 h-full border rounded-lg shadow-2xl flex flex-col justify-center items-center overflow-y-scroll">
                    <JobList jobList={filteredJobs} setSelected={setSelected}/>
                  </div>
              </div>
          </React.Fragment>
        </div> 
      }
    </React.Fragment>
  );
}

export default App;
