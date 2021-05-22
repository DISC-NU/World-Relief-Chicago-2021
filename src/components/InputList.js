import React from 'react';
import { jobs } from '../data.js';
import { Input } from './Input';

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

// List of all input fields to filter by (LHS of app screen)
export const InputList = ({fields, setFilteredJobs, query, setQuery}) => {
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