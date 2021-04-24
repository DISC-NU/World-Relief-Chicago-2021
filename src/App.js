import './App.css';
import React, { useState, useEffect } from 'react';


// TENTATIVELY: 
// Company Name: String
// English Level: Integer
// Location: Array of Strings 
// Shift: Array of Integers 
// Industry: String
// Notes: String
// Shifts: [0, 1, 2] for Day Afternoon Night
// Intermediate English = 2


// Fields to filter jobs by
const fields = ["English", "Locations", "Shifts", "Industry"]

// Bi-directional mapping from english level, shift # to description 
const englishMapping = {
  1: "Basic",
  2: "Intermediate",
  3: "Advanced"
}

const shiftMapping = {
  0: "Day",
  1: "Afternoon",
  2: "Night"
}

const englishMapping2 = {
  "Basic": 1,
  "Intermediate": 2,
  "Advanced": 3
}

const shiftMapping2 = {
  "Day": 0, 
  "Afternoon": 1,
  "Night": 2
}

// Hard-coded job list
const jobs = {
  AdvocateHealth: {
    company: 'Advocate Health',
    english: 2,
    locations: ['Lakeview', 'Park Ridge', 'Oak Lawn', 'South Chicago', 'Downers Grove'],
    shifts: [0, 1, 2],
    industry: "Medical",
    notes: {
      description: 
       `Rachael Fecht is POC; 3 positions available: 
        CNA, Housekeeping, Food and Nutrition. Apply online for a position, include resume. 
        Email Rachael to inform her of application. Personal assessment required. 
        HR interview guaranteed if personal assessment is passed. 
        Pay starts at $14, increases with experience level.`
    }
  },
  
  Amazon: {
    company: 'Amazon',
    english: 2,
    locations: ['Multiple', 'Multiple'],
    shifts: [0, 1, 2],
    industry: "Warehouse",
    notes: {
      description: 
        `Need enough english to nevigate the warehouse. 
        Check https://www.amazon.jobs/en/ for current available jobs. 
        Create account and apply for client. Various locations`
    }
  }
}

// Job component (individual job)
const Job = ({job, setSelected}) => {
  return (
    <div 
      onClick={() => setSelected(job)}
      className="w-4/6 h-16 border rounded-2xl flex items-center justify-center mt-2">
      {job.company}, {job.locations.length > 1 ? "Multiple locations" : job.locations[0]}
    </div>
  );
}

// List of jobs (display on RHS of app screen)
const JobList = ({jobList, setSelected}) => {
  return (
    Object.keys(jobList).length === 0 
    ? 
    <text>No matching jobs!</text>
    :
    <React.Fragment>
      {Object.values(jobList).map((job, index) => {
        return <Job id={index} job={job} setSelected={setSelected}/>
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
        <Input id={index} field={field} query={query} setQuery={setQuery}/>
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
                if (englishMapping2[value] < job['english']) {
                  validJob = false;
                  break;
                }
              } else if (keyParsed === 'locations') {
                if (!job.locations.includes(value)) {
                  validJob = false;
                  break;
                }
              } else if (keyParsed === 'shifts') {
                if (!job.shifts.includes(shiftMapping2[value])) {
                  validJob = false;
                  break;
                }
              } else if (keyParsed === 'industry') {
                if (value !== job['industry']) {
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
      <div className="w-auto font-sans text-6xl mt-10 mb-10">
        {selected.company}, {selected.locations.length > 1 ? "Multiple Locations" : selected.locations[0]}
      </div>
      <div className="w-5/6 text-4xl flex items-start justify-start mb-5">English Level:</div>
      <div className="w-5/6 h-auto font-sans text-2xl mb-5">{englishMapping[selected.english]}</div>
      <div className="w-5/6 text-4xl flex items-start justify-start mb-5">Shifts:</div>
      <div className="w-5/6 h-auto font-sans text-2xl mb-5">{selected.shifts.map((shift, index) => 
            (index === selected.shifts.length - 1 ? shiftMapping[shift] : shiftMapping[shift] + ", "))}</div>
      <div className="w-5/6 text-4xl flex items-start justify-start mb-5">Industry:</div>
      <div className="w-5/6 h-auto font-sans text-2xl mb-5">{selected.industry}</div>
      <div className="w-5/6 text-4xl flex items-start justify-start mb-5">Locations:</div>
      <div className="w-5/6 h-auto font-sans text-2xl mb-5">{selected.locations.map((location, index) => 
            (index === selected.locations.length - 1 ? location : location + ", "))}</div>
      <div className="w-5/6 text-4xl flex items-start justify-start mb-5">Job Description:</div>
      <div className="w-5/6 h-4/6 font-sans text-2xl">{selected.notes.description}</div>
      <div className="w-1/6 h-16 border rounded-md flex items-center justify-center"
           onClick={() => setSelected(null)}>Close</div>
    </div>
  );
}

// Main app: encapsulates input fields, (filtered) job list, & modals for individual jobs
function App() {
  
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState({});
  const [filteredJobs, setFilteredJobs] = useState(jobs);

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
                  <div className="w-6/12 h-5/6 border rounded-lg shadow-2xl flex flex-col 
                    justify-center items-center">
                    <JobList 
                      jobList={filteredJobs} 
                      setSelected={setSelected}
                    />
                  </div>
              </div>
          </React.Fragment>
        </div> 
      }
    </React.Fragment>
  );
}

export default App;