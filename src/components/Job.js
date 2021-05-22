import React from 'react';

// Job component (individual job)
export const Job = ({job, setSelected}) => {
    const jobData = job.data;

    return (
      <div 
        onClick={() => setSelected(job)}
        className="w-5/6 h-24 border rounded-2xl flex items-center justify-center mt-2">
        {jobData[0]}: {jobData[4].includes(';') > 1 ? "Multiple locations" : jobData[4]}
      </div>
    );
  }