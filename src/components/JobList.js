import React from 'react';
import { Job } from './Job';

// List of jobs (display on RHS of app screen)
export const JobList = ({jobList, setSelected}) => {
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
        return <Job id={index} job={job} setSelected={setSelected}/>
      })}
      </React.Fragment>
    );
  }