import './App.css';
import React, { useState, useEffect } from 'react';
import { CSVToJSON } from './components/FileUpload';
import { JobDetailModal } from './components/JobDetailModal';
import { InputList } from './components/InputList';
import { JobList } from './components/JobList';
import { Loader } from "@googlemaps/js-api-loader";
 

function App() {
  const [service, setService] = useState(null);
  useEffect(()=> {
    if (service == null) {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_API_KEY,
        version: "weekly"
      });
      loader.load().then(() => {
        setService(new window.google.maps.DistanceMatrixService());
      })
    }
  },[service])


  const realGetTime = async (origin, dest) => {
    const result = await getTime(origin, dest);
    return result
  }

  const getTime = (origin, dest) => new Promise((resolve, reject) => {
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [dest],
      travelMode: 'TRANSIT'
    }, (response, status) => {
      if (status === "OK") {
        resolve(response);
      } else {
        reject(response);
      }
    })
  })

  const [selected, setSelected] = useState(null); // (1)
  const [query, setQuery] = useState({}); // (2)
  const [jobs, setJobs] = useState([]); // (3)
  const [filteredJobs, setFilteredJobs] = useState([]); // (4)
  const [location, setLocation] = useState({place: '2110 W Greenleaf Ave, Chicago, IL 60645', limit: '9 hr 30 mins'})
  const fields = ['Matching Schema', 'English', 'Shifts', 'Billingual', 'Weekend']; // (5)
  const options = [
    ['Match At Least One Field'], 
    ['None', 'Basic', 'Intermediate', 'Advanced'],
    ['Morning','Afternoon','Night'], 
    ['Yes'],
    ['Yes']
  ];

  async function handleClick() {
      let fakeFilteredJobs = {}; 
      let realFilteredJobs = {};

      Object.values(jobs).forEach((job) => {
        if (!query["Matching Schema"]) {
          if (allFieldMatch(job, query)) {
            let newJob = {...job};
            fakeFilteredJobs[newJob.company] = newJob;
          }
        } else if (query["Matching Schema"].includes("Match At Least One Field")) {
          if (oneFieldMatch(job, query)) {
            let newJob = {...job};
            fakeFilteredJobs[newJob.company] = newJob;
          }
        } else {
          if (allFieldMatch(job, query)) {
            let newJob = {...job};
            fakeFilteredJobs[newJob.company] = newJob;
          }
        }})

      async function underLimit(job) {
        for (let place of job.locations) {
          const data = await realGetTime(location.place, place);

          console.log("job: ", job)
       
          for (let row of data.rows) {
            for (let i = 0; i < row.elements.length; i++) {
              const element = row.elements[i];

              if (element.duration && element.duration.value <= parseLimit(location.limit)) {
                let newJob = jobs[job.company];
                newJob['duration'] = `${element.duration.text} (To Location: ${data.destinationAddresses[i]})`;
                realFilteredJobs[job.company] = newJob;
              }
            }
          }
        }
      }

      if (location != null && location.place != null && location.limit != null) {
          await Promise.all(Object.values(fakeFilteredJobs).map(async (job) => {
          await underLimit(job)
        }));
        setFilteredJobs(realFilteredJobs)
      } else {
          setFilteredJobs(fakeFilteredJobs);
      }
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function parseLimit (limit) {
    let limitArr = limit.split(' ');
    return limitArr[0] * 3600 + limitArr[2] * 60
  }

  function handleLocation(e) {
    let newQuery = {...location}
    newQuery["place"] = e.target.value;
    setLocation(newQuery)
  }

  function handleLimit(e) {
    let newQuery = {...location}
    newQuery["limit"] = parseLimit(e.target.value);
    setLocation(newQuery)
  }


  const allFieldMatch = (job, query) => {
    // Loop over each input field; determine if it matches w/ the current job data
    for (const [key, value] of Object.entries(query)) {
      if (value.length === 0) {
        continue; // Keys that were potentially cleared out from before
      }
      let keyParsed = key.toLowerCase();
      if (keyParsed === 'english') {
        if (!value.includes(capitalize(job.english))) {
          return false;
        }
      } else if (keyParsed === 'billingual') {
        let bilingual;
        job.bilingual ? bilingual = 'Yes' : bilingual = 'No';

        if (value[0] === 'Yes' && bilingual === 'No') {
          return false;
        }
      } else if (keyParsed === 'shifts') {
        if (!job.shifts.includes(value.toLowerCase())) {
          return false;
        }
      } else if (keyParsed === 'weekend') {
        let weekend;
        job.weekend ? weekend = 'Yes' : weekend = 'No';

        if (value[0] === 'Yes' && weekend === 'No') {
          return false;
        }
      } else {
        continue;
      }
    }
    return true;
  }

  // Designate a job as a match if we match AT LEAST ONE query parameter
  const oneFieldMatch = (job, query) => {
    // Loop over each input field; determine if it matches w/ the current job data
    for (const [key, value] of Object.entries(query)) {
      if (value.length === 0) {
        continue; // Keys that were potentially cleared out from before
      }

      let keyParsed = key.toLowerCase();

      if (keyParsed === 'english') {
        if (value.includes(capitalize(job.english))) {
          return true;
        }
      } else if (keyParsed === 'billingual') {
        let bilingual;
        job.bilingual ? bilingual = 'Yes' : bilingual = 'No';

        if (value[0] === 'Yes' && bilingual === 'Yes') {
          return true;
        }
      } else if (keyParsed === 'shifts') {
        if (job.shifts.includes(value.toLowerCase())) {
          return true;
        }
      } else if (keyParsed === 'weekend') {
        let weekend;
        job.weekend ? weekend = 'Yes' : weekend = 'No';
        if (value[0] === 'Yes' && weekend === 'Yes') {
          return true
        }
      } else {
        continue;
      }
    }
    return false;
  }

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
              <CSVToJSON setJobs={setJobs} setFilteredJobs={setFilteredJobs}></CSVToJSON>
              <div className="w-full h-full flex justify-around flex-row items-center">
                  <div className="w-5/12 h-full border rounded-lg shadow-2xl flex flex-col items-center justify-start">
                    <br></br>
                    <br></br>
                    <InputList 
                      options={options}
                      fields={fields} 
                      jobs={jobs}
                      setFilteredJobs={setFilteredJobs}
                      query={query} 
                      setQuery={setQuery}
                    />
                    <div className="flex justify-start align-start w-5/6 h-auto flex-col">
                      <h1 className="w-5/6 mb-2 text-2xl">Location</h1>
                        <input type="text" placeholder="Starting location..." className="border"
                            value={location.place || null}
                            onChange={handleLocation}
                            > 
                        </input>
                        <input type="text" placeholder="e.g. type 3 hrs 2 min" className="border"
                        value={location.limit || null}
                         onChange={handleLimit}
                        > 
                        </input>
                      <br></br>
                    </div>
        <button 
          className="w-5/6 h-16 border rounded-2xl mb-10"
          onClick={handleClick}>
          Filter Jobs
        </button>
                  </div>
                  <div 
                    className="w-6/12 h-full border rounded-lg shadow-2xl flex flex-col justify-center items-center overflow-y-scroll">
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
