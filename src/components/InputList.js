import React from 'react';
import { Input } from './Input';

// List of all input fields to filter by (LHS of app screen)
export const InputList = ({fields, jobs, setFilteredJobs, query, setQuery}) => {
    return (
      <React.Fragment>
        {fields.map((field, index) => (
          <Input id={index} field={field} query={query} setQuery={setQuery}/>
        ))}
        <button 
          className="w-5/6 h-16 border rounded-2xl mb-10"
          onClick={() => {
  
            // Jobs that match all input criteria
            let filteredJobs = []; 
  
            // Loop over each job, add to `filteredJobs` if appropriate
            jobs.map((job) => {
              let jobData = job.data;
              let validJob = true;
  
              // Loop over each input field; determine if it matches w/ the current job data
              for (const [key, value] of Object.entries(query)) {
                if (value === "") {
                  continue; // Keys that were potentially cleared out from before
                }
  
                let keyParsed = key.toLowerCase();
  
                if (keyParsed === 'english') {
                  if (value.toLowerCase() !== jobData[2].toLowerCase()) {
                    validJob = false;
                    break;
                  }
                } else if (keyParsed === 'spanish') {
                  if (jobData[3].toLowerCase() !== value.toLowerCase()) {
                    validJob = false;
                    break;
                  }
                } else if (keyParsed === 'locations') {
                  if (!jobData[4].includes(value)) { // TODO: make case-insensitive
                    validJob = false;
                    break;
                  }
                } else if (keyParsed === 'shift') {
                  if (!jobData[5].includes(value.toLowerCase())) {
                    validJob = false;
                    break;
                  }
                } else if (keyParsed === 'weekend') {
                  if (jobData[6].toLowerCase() !== value.toLowerCase()) {
                    validJob = false;
                    break;
                  }
                } else {
                  continue;
                }  
              }
  
              if (validJob) {
                filteredJobs.push(job);
              }
  
              setFilteredJobs(filteredJobs);
            })
          }}>
          Filter Jobs
        </button>
      </React.Fragment>
    );
  }