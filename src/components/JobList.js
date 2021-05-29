import React, { useEffect, useState } from 'react';
import { Job } from './Job';

// List of jobs (display on RHS of app screen)
export const JobList = ({jobList, setSelected}) => {
    const [zero, setZero] = useState(Object.values(jobList).length === 0)

    useEffect(()=> {
      setZero(Object.values(jobList).length === 0)
    },[jobList, zero])

    useEffect(() => {
    },[zero])

    return (
      <div>
        {
        zero ? 
        <div>No matching jobs!</div>
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
          return <Job id={index} key={index} job={job} setSelected={setSelected}/>
        })}
        </React.Fragment>
          }
      </div>
      
    );
  }