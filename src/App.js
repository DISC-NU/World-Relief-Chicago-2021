import './App.css';
import React, { useState, useEffect } from 'react';


// TENTATIVELY: 
// Company Name: String
// English Level: Integer
// Location: Array of Strings 
// Shift: Array of Integers 
// Industry: String
// Notes: String
// Shifts: [0, 1, 2] for Day Afternoon Night
// Intermediate English = 2

const criteria = ["english", "locations", "shift", "industry"]

const englishMapping = {
  1: "Basic",
  2: "Intermediate",
  3: "Advanced"
}

const shiftMapping = {
  0: "Day",
  1: "Afternoon",
  2: "Night"
}

const jobs = {
  AdvocateHealth: {
    company: 'Advocate Health',
    english: 2,
    locations: ['Lakeview', 'Park Ridge', 'Oak Lawn', 'South Chicago', 'Downers Grove'],
    shift: [0, 1, 2],
    industry: "Medical",
    notes: {
      description: 
       `Rachael Fecht is POC; 3 positions available: 
        CNA, Housekeeping, Food and Nutrition. Apply online for a position, include resume. 
        Email Rachael to inform her of application. Personal assessment required. 
        HR interview guaranteed if personal assessment is passed. 
        Pay starts at $14, increases with experience level.`
    }
  },
  
  Amazon: {
    company: 'Amazon',
    english: 2,
    locations: ['Multiple', 'Multiple'],
    shift: [0, 1, 2],
    industry: "Warehouse",
    notes: {
      description: 
        `Need enough english to nevigate the warehouse. 
        Check https://www.amazon.jobs/en/ for current available jobs. 
        Create account and apply for client. Various locations`
    }
  }
}

const Job = ({job, setSelected}) => {
  return (
    <div 
      onClick={() => setSelected(job)}
      className="w-4/6 h-16 border rounded-2xl flex items-center justify-center mt-2">
      {job.company}, {job.locations.length > 1 ? "Multiple locations" : job.locations[0]}
    </div>
  );
}

const JobList = ({jobList, setSelected}) => {
  return (
    <React.Fragment>
      {Object.values(jobList).map(job => {
        return <Job job={job} setSelected={setSelected}/>
      })}
    </React.Fragment>
  );
}

const Modal = ({selected, setSelected}) => {
  return (
    <div className="w-11/12 h-5/6 border rounded-lg shadow-2xl flex flex-col items-center">
      <div className="w-auto font-sans text-6xl mt-10 mb-10">
        {selected.company}, {selected.locations.length > 1 ? "Multiple Locations" : selected.locations[0]}
      </div>
      <div className="w-5/6 text-4xl flex items-start justify-start mb-5">Job Description:</div>
      <div className="w-5/6 h-4/6 font-sans text-2xl">{selected.notes.description}</div>
      <div className="w-1/6 h-16 border rounded-md flex items-center justify-center"
           onClick={() => setSelected(null)}>Close</div>
    </div>
  );
}

function App() {
  
  const [selected, setSelected] = useState(null);

  return (

    <React.Fragment>
      {selected ? 
        <div className="w-screen h-screen flex items-center justify-center">
          <Modal selected={selected} setSelected={setSelected}></Modal>
        </div>
         :
        <div className="w-screen h-screen">
            <React.Fragment>
              <br></br>
              <div className="w-auto h-auto font-sans text-6xl flex flex-row justify-center items-center">
                World Relief Chicago Job Match
              </div>
              <div className="w-full h-5/6 flex justify-around flex-row items-center">
                  <div className="w-5/12 h-5/6 border rounded-lg shadow-2xl flex flex-col items-center justify-center">
                  </div>
                  <div className="w-6/12 h-5/6 border rounded-lg shadow-2xl flex flex-col 
                    justify-center items-center">
                    <JobList jobList={jobs} setSelected={setSelected}/>
                  </div>
              </div>
          </React.Fragment>
        </div> 
      }
    </React.Fragment>
  );
}



export default App;
