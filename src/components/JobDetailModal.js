import React from 'react';

// Modal to display specific info for a selected job
export const JobDetailModal = ({selected, setSelected}) => {
    const jobData = selected.data;

    return (
      <div className="w-11/12 h-5/6 border rounded-lg shadow-2xl flex flex-col items-center">
        <div className="w-auto font-sans text-3xl mt-5 mb-5">
          {jobData[0]}, {jobData[4].includes(';') ? "Multiple Locations" : jobData[4]}
        </div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-5">English Level:</div>
        <div className="w-5/6 h-auto font-sans text-1xl mb-2">{jobData[2]}</div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Bilingual/Spanish:</div>
        <div className="w-5/6 h-auto font-sans text-1xl mb-2">{jobData[3]}</div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Shifts:</div>
        <div className="w-5/6 h-auto font-sans text-1xl mb-2">{jobData[5]}</div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Weekend Shifts:</div>
        <div className="w-5/6 h-auto font-sans text-1xl mb-2">{jobData[6]}</div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Industry:</div>
        <div className="w-5/6 h-auto font-sans text-1xl mb-2">{jobData[1]}</div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Locations:</div>
        <div className="w-5/6 h-auto font-sans text-1xl mb-2">{jobData[4]}</div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-2">Job Description:</div>
        <div className="w-5/6 h-4/6 font-sans text-1xl">{jobData[7]}</div>
        <div className="w-1/6 h-16 border rounded-md flex items-center justify-center mb-5" 
             onClick={() => setSelected(null)}>Close</div>
      </div>
    );
  }