import React from 'react';
import { Input } from './Input';

// List of all input fields to filter by (LHS of app screen)
export const InputList = ({options,fields, jobs, setFilteredJobs, query, setQuery}) => {

    const capitalize = (s) => {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return (
      <React.Fragment>
        {fields.map((field, index) => (
          <Input id={index} options={options[index]} field={field} query={query} setQuery={setQuery}/>
        ))}
        <button 
          className="w-5/6 h-16 border rounded-2xl mb-10"
          onClick={() => {
  
            // Jobs that match all input criteria
            let filteredJobs = []; 
  
            // Loop over each job, add to `filteredJobs` if appropriate
            Object.values(jobs).map((job) => {
              let validJob = true;
  
              // Loop over each input field; determine if it matches w/ the current job data
              for (const [key, value] of Object.entries(query)) {
                if (value.length === 0) {
                  continue; // Keys that were potentially cleared out from before
                }
  
                let keyParsed = key.toLowerCase();
  
                if (keyParsed === 'english') {
                  if (!value.includes(capitalize(job.english))) {
                    validJob = false;
                    break;
                  }
                } else if (keyParsed === 'billingual') {
                  let bilingual;
                  job.bilingual ? bilingual = 'Yes' : bilingual = 'No';

                  if (value[0] === 'Yes' && bilingual === 'No') {
                    validJob = false;
                    break;
                  }
                } else if (keyParsed === 'shifts') {
                  if (!job.shifts.includes(value.toLowerCase())) {
                    validJob = false;
                    break;
                  }
                } else if (keyParsed === 'weekend') {
                  let weekend;
                  job.weekend ? weekend = 'Yes' : weekend = 'No';

                  if (value[0] === 'Yes' && weekend === 'No') {
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