import './App.css';
import React, { useState, useEffect } from 'react';
import { fields, englishMapping, shiftMapping, jobs } from './data.js';
// This is needed when we uncomment the useEffect
import { Loader } from "@googlemaps/js-api-loader";


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

// Job component (individual job)
const Job = ({job, setSelected}) => {
  return (
    <div 
      onClick={() => setSelected(job)}
      className="w-5/6 h-16 border rounded-2xl flex items-center justify-center mt-2">
      {job.company}, {job.locations.length > 1 ? "Multiple locations" : job.locations[0]}
    </div>
  );
}

// List of jobs (display on RHS of app screen)
const JobList = ({jobList, setSelected}) => {
  console.log(jobList);
  return (
    Object.keys(jobList).length === 0 
    ? 
    <text>No matching jobs!</text>
    :
    <React.Fragment>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    {Object.values(jobList).map((job, index) => {
      return <Job id={index} job={job} setSelected={setSelected} key={index}/>
    })}
    </React.Fragment>
  );
}

// Input field component (english, location, shift, or industry field)
const Input = ({field, query, setQuery}) => {
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

// List of all input fields to filter by (LHS of app screen)
const InputList = ({fields, setFilteredJobs, query, setQuery}) => {
  return (
    <React.Fragment>
      {fields.map((field, index) => (
        <Input id={index} field={field} query={query} setQuery={setQuery} key={index}/>
      ))}
      <button 
        className="w-5/6 h-16 border rounded-2xl mb-10"
        onClick={() => {

          // Jobs that match all input criteria
          let filteredJobs = {}; 

          // Loop over each job, add to `filteredJobs` if appropriate
          Object.values(jobs).map((job) => {
            let validJob = true;

            // Loop over each input field; determine if it matches w/ the current job data
            for (const [key, value] of Object.entries(query)) {
              if (value === "") {
                continue; // Keys that were potentially cleared out from before
              }

              let keyParsed = key.toLowerCase();

              if (keyParsed === 'english') {
                if (englishMapping2[value.toLowerCase()] !== job['english']) {
                  validJob = false;
                  break;
                }
              } else if (keyParsed === 'locations') {
                if (!job.locations.includes(value)) { // TODO: make case-insensitive
                  validJob = false;
                  break;
                }
              } else if (keyParsed === 'shifts') {
                if (!job.shifts.includes(shiftMapping2[value.toLowerCase()])) {
                  validJob = false;
                  break;
                }
              } else if (keyParsed === 'industry') {
                if (value !== job['industry']) { // TODO: make case-insensitive
                  validJob = false;
                  break;
                }
              } else {
                continue;
              }  
            }

            if (validJob) {
              filteredJobs[job.company] = job;
            }

            setFilteredJobs(filteredJobs);
          })
        }}>
        Filter Jobs
      </button>
    </React.Fragment>
  );
}


// Modal to display specific info for a selected job
const Modal = ({selected, setSelected}) => {
  return (
    <div className="w-11/12 h-5/6 border rounded-lg shadow-2xl flex flex-col items-center">
      <div className="w-auto font-sans text-3xl mt-5 mb-5">
        {selected.company}, {selected.locations.length > 1 ? "Multiple Locations" : selected.locations[0]}
      </div>
      <div className="w-5/6 text-2xl flex items-start justify-start mb-5">English Level:</div>
      <div className="w-5/6 h-auto font-sans text-1xl mb-2">{englishMapping[selected.english]}</div>
      <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Shifts:</div>
      <div className="w-5/6 h-auto font-sans text-1xl mb-2">{selected.shifts.map((shift, index) => 
            (index === selected.shifts.length - 1 ? shiftMapping[shift] : shiftMapping[shift] + ", "))}</div>
      <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Industry:</div>
      <div className="w-5/6 h-auto font-sans text-1xl mb-2">{selected.industry}</div>
      <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Locations:</div>
      <div className="w-5/6 h-auto font-sans text-1xl mb-2">{selected.locations.map((location, index) => 
            (index === selected.locations.length - 1 ? location : location + ", "))}</div>
      <div className="w-5/6 text-2xl flex items-start justify-start mb-2">Job Description:</div>
      <div className="w-5/6 h-4/6 font-sans text-1xl">{selected.notes.description}</div>
      <div className="w-1/6 h-16 border rounded-md flex items-center justify-center mb-5" 
           onClick={() => setSelected(null)}>Close</div>
    </div>
  );
}

// Main app: encapsulates input fields, (filtered) job list, & modals for individual jobs

function App() {

  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState({});
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [service, setService] = useState(null);

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

  function GetTime(origin, dest) {
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [dest],
      travelMode: 'TRANSIT'
    }, (response, status) => {if (status === "OK") console.log(response)})
  }

  return (
    <React.Fragment>
      {selected ? 
        <div className="w-screen h-screen flex items-center justify-center">
          <Modal selected={selected} setSelected={setSelected}></Modal>
        </div>
         :
        <div className="w-screen h-screen">
            <React.Fragment>
              <br></br>
              <div className="w-auto h-auto font-sans text-6xl flex flex-row justify-center items-center">
                World Relief Chicago Job Match
              </div>
              <div className="w-full h-5/6 flex justify-around flex-row items-center">
                  <div className="w-5/12 h-5/6 border rounded-lg shadow-2xl flex flex-col items-center justify-center">
                    <InputList 
                      fields={fields} 
                      setFilteredJobs={setFilteredJobs}
                      query={query} 
                      setQuery={setQuery}
                    />
                  </div>
                  <div 
                    className="w-6/12 h-5/6 border rounded-lg shadow-2xl flex flex-col justify-center items-center overflow-y-scroll">
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