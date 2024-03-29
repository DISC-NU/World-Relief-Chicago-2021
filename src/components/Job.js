import React from 'react';

// Job component (individual job)
export const Job = ({job, setSelected}) => {
    return (
      <div  
        onClick={() => setSelected(job)}
        className="w-full h-10 border rounded-2xl flex items-center justify-center mt-2">
        {job.company}: {job.locations.length > 1 ? "Multiple locations" : job.locations[0]}
      </div>
    );
  }