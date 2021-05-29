import React, { useEffect, useState } from 'react';
import { Job } from './Job';

// List of jobs (display on RHS of app screen)
export const JobList = ({jobList, setSelected}) => {
    // useEffect(() => {
    //   console.log("This was the given joblist:", jobList)
    //   console.log("This was the given joblist as an array:", Object.values(jobList))
    //   console.log("This was the given joblist's length:", Object.values(jobList).length)
    // },[jobList])

    const [zero, setZero] = useState(Object.values(jobList).length === 0)

    useEffect(()=> {
      console.log("Given jobList", jobList)
      console.log("Length of the joblist:", Object.values(jobList).length)
      setZero(Object.values(jobList).length === 0)
    },[jobList, zero])

    useEffect(() => {
      console.log("ZERO:" , zero)
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