import React from 'react';
import { Input } from './Input';

// List of all input fields to filter by (LHS of app screen)
export const InputList = ({options,fields, jobs, setFilteredJobs, query, setQuery}) => {
  //   const Location = () => {
  //     return (
  //       <div className="flex justify-start align-start w-5/6 h-auto flex-col">
  //           <h1 className="w-5/6 mb-2 text-2xl">Location</h1>
  //           <input type="text" placeholder="Starting location..." className="border"></input>
  //           <input type="text" placeholder="e.g. type 3 hrs 2 min" className="border"></input>
  //           <br></br>
  //       </div>
  //     )
  //   }

  // console.log(options);
  




    // Only designate a job as a 'match' if we match ALL query parameters

    return (
      <React.Fragment>
        <React.Fragment>
        {fields.map((field, index) => (
          <Input id={index} options={options[index]} field={field} query={query} setQuery={setQuery}/>
        ))}
        </React.Fragment>       
      </React.Fragment>
    );
  }