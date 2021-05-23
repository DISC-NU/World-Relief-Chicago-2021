import React from 'react';
import { Input } from './Input';

// List of all input fields to filter by (LHS of app screen)
export const InputList = ({options,fields, jobs, setFilteredJobs, query, setQuery}) => {
    const Location = () => {
      return (
        <div className="flex justify-start align-start w-5/6 h-auto flex-col">
            <h1 className="w-5/6 mb-2 text-2xl">Location</h1>
            <input type="text" placeholder="Starting location..." className="border"></input>
            <input type="text" placeholder="e.g. type 3 hrs 2 min" className="border"></input>
            <br></br>
        </div>
      )
    }

    // Capitalize a word (1st char uppercase, all else lowercase)
    const capitalize = (s) => {
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }


    // Only designate a job as a 'match' if we match ALL query parameters
    const allFieldMatch = (job, query) => {

      // Loop over each input field; determine if it matches w/ the current job data
      for (const [key, value] of Object.entries(query)) {
        if (value.length === 0) {
          continue; // Keys that were potentially cleared out from before
        }

        let keyParsed = key.toLowerCase();

        if (keyParsed === 'english') {
          if (!value.includes(capitalize(job.english))) {
            return false;
          }
        } else if (keyParsed === 'billingual') {
          let bilingual;
          job.bilingual ? bilingual = 'Yes' : bilingual = 'No';

          if (value[0] === 'Yes' && bilingual === 'No') {
            return false;
          }
        } else if (keyParsed === 'shifts') {
          if (!job.shifts.includes(value.toLowerCase())) {
            return false;
          }
        } else if (keyParsed === 'weekend') {
          let weekend;
          job.weekend ? weekend = 'Yes' : weekend = 'No';

          if (value[0] === 'Yes' && weekend === 'No') {
            return false;
          }
        } else {
          continue;
        }
      }

      return true;
    }


    // Designate a job as a match if we match AT LEAST ONE query parameter
    const oneFieldMatch = (job, query) => {

      // Loop over each input field; determine if it matches w/ the current job data
      for (const [key, value] of Object.entries(query)) {
        if (value.length === 0) {
          continue; // Keys that were potentially cleared out from before
        }

        let keyParsed = key.toLowerCase();

        if (keyParsed === 'english') {
          if (value.includes(capitalize(job.english))) {
            return true;
          }
        } else if (keyParsed === 'billingual') {
          let bilingual;
          job.bilingual ? bilingual = 'Yes' : bilingual = 'No';

          if (value[0] === 'Yes' && bilingual === 'Yes') {
            return true;
          }
        } else if (keyParsed === 'shifts') {
          if (job.shifts.includes(value.toLowerCase())) {
            return true;
          }
        } else if (keyParsed === 'weekend') {
          let weekend;
          job.weekend ? weekend = 'Yes' : weekend = 'No';

          if (value[0] === 'Yes' && weekend === 'Yes') {
            return true
          }
        } else {
          continue;
        }
      }

      return false;
    }

    return (
      <React.Fragment>
        <React.Fragment>
        {fields.map((field, index) => (
          <Input id={index} options={options[index]} field={field} query={query} setQuery={setQuery}/>
        ))}
        </React.Fragment>
        <Location></Location>
        <button 
          className="w-5/6 h-16 border rounded-2xl mb-10"
          onClick={() => {
  
            // Jobs that match all input criteria
            let filteredJobs = []; 
  
            // Loop over each job, add to `filteredJobs` if appropriate, 
            // dispatching based on matching all fields or at least one field
            Object.values(jobs).map((job) => {
              if (!query["Matching Schema"]) {
                if (allFieldMatch(job, query)) {
                  filteredJobs[job.company] = job;
                }
              } else if (query["Matching Schema"].includes("Match At Least One Field")) {
                if (oneFieldMatch(job, query)) {
                  filteredJobs[job.company] = job;
                }
              } else {
                if (allFieldMatch(job, query)) {
                  filteredJobs[job.company] = job;
                }
              }
  
              setFilteredJobs(filteredJobs);
            })
          }}>
          Filter Jobs
        </button>
      </React.Fragment>
    );
  }