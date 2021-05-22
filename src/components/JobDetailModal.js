import React from 'react';

// Modal to display specific info for a selected job
export const JobDetailModal = ({selected, setSelected}) => {
    const capitalize = (s) => {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return (
      <div className="w-11/12 h-5/6 border rounded-lg shadow-2xl flex flex-col items-center">
        <div className="w-auto font-sans text-3xl mt-5 mb-5">
          {selected.company}: {selected.locations.length > 1 ? "Multiple Locations" : selected.locations[0]}
        </div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-5">English Level:</div>
        <div className="w-5/6 h-auto font-sans text-1xl mb-2">{capitalize(selected.english)}</div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Bilingual:</div>
        <div className="w-5/6 h-auto font-sans text-1xl mb-2">{capitalize(selected.bilingual.toString())}</div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Shifts:</div>
        <div className="w-5/6 h-auto font-sans text-1xl mb-2">{selected.shifts.map((shift, index) => 
              (index === selected.shifts.length - 1 ? capitalize(shift) : capitalize(shift) + ", "))}</div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Weekend Shifts:</div>
        <div className="w-5/6 h-auto font-sans text-1xl mb-2">{capitalize(selected.weekend.toString())}</div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Industry:</div>
        <div className="w-5/6 h-auto font-sans text-1xl mb-2">{selected.industry}</div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-5">Locations:</div>
        <div className="w-5/6 h-auto font-sans text-1xl mb-2">{selected.locations.map((location, index) => 
              (index === selected.locations.length - 1 ? location : location + "; "))}</div>
        <div className="w-5/6 text-2xl flex items-start justify-start mb-2">Job Description:</div>
        <div className="w-5/6 h-4/6 font-sans text-1xl">{selected.notes}</div>
        <div className="w-1/6 h-16 border rounded-md flex items-center justify-center mb-5" 
             onClick={() => setSelected(null)}>Close</div>
      </div>
    );
  }