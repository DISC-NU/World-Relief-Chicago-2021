import './App.css';
import React, { useState } from 'react';
import { fields, jobs } from './data.js';
import { JobList } from './components/JobList';
import { InputList } from './components/InputList';
import { JobDetailModal } from './components/JobDetailModal';

// Main app: encapsulates input fields, (filtered) job list, & modals for individual jobs
function App() {
  
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState({});
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  return (
    <React.Fragment>
      {selected ? 
        <div className="w-screen h-screen flex items-center justify-center">
          <JobDetailModal selected={selected} setSelected={setSelected}></JobDetailModal>
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
                    <InputList 
                      fields={fields} 
                      setFilteredJobs={setFilteredJobs}
                      query={query} 
                      setQuery={setQuery}
                    />
                  </div>
                  <div 
                    className="w-6/12 h-5/6 border rounded-lg shadow-2xl flex flex-col justify-center items-center overflow-y-scroll">
                    <JobList jobList={filteredJobs} setSelected={setSelected}/>
                  </div>
              </div>
          </React.Fragment>
        </div> 
      }
    </React.Fragment>
  );
}

export default App;