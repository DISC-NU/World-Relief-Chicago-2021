import './App.css';
import React, { useState, useEffect } from 'react';
import { CSVToJSON } from './components/FileUpload';
import { JobDetailModal } from './components/JobDetailModal';
import { InputList } from './components/InputList';
import { JobList } from './components/JobList';
import { Loader } from "@googlemaps/js-api-loader";
import { firebase } from './firebase';

function App() {
  const [service, setService] = useState(null);   // Google Maps API Service
  const [codeStatic, setCodeStatic] = useState(null);   // Access code from Firebase

  // If necessary, pull the access code from Firebase
  useEffect(() => {
    if (codeStatic == null) {
      const db = firebase.database().ref('access');
      const handleData = (snap) => {
        if (snap.val()) {
          setCodeStatic(snap.val())
        }
      }
      db.on('value', handleData, (error) => console.log(error))
      return () => db.off('value', handleData)
    }
  }, [codeStatic])

  // If necessary, obtain the required Google Maps API Service
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

  //
  // Helper functions for computing times & distances
  //

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


  /*
    State variables to store the following information:
      (1) Specific job that was selected (on the RHS in the list of all jobs)
      (2) Query to filter the job list by
      (3) List of all uploaded jobs from the CSV file
      (4) List of all filtered jobs that match the query criteria
      (5) Categories to filter the job by
      (6) Potential values for these^^ categories
      (7) Access code the user has typed in (on the initial authetication page)
      (8) Whether or not the user is autheticated (i.e. has entered the correct access code)
  */
  const [selected, setSelected] = useState(null); // (1)
  const [query, setQuery] = useState({}); // (2)
  const [jobs, setJobs] = useState([]); // (3)
  const [filteredJobs, setFilteredJobs] = useState([]); // (4)
  const [location, setLocation] = useState({place: '', limit: ''})
  const fields = ['Matching Schema', 'English', 'Shifts', 'Billingual', 'Weekend']; // (5)
  const options = [
    ['Match At Least One Field'], 
    ['None', 'Basic', 'Intermediate', 'Advanced'],
    ['Morning','Afternoon','Night'], 
    ['Yes'],
    ['Yes']
  ]; // (6)
  const [code, setCode] = useState(""); // (7)
  const [loggedIn, setLoggedIn] = useState(false); // (8)

  /*
    Once the 'Filter Jobs' button is clicked, go here
    to correctly filter the jobs based on the user's inputs
  */
  async function handleClick() {
      let fakeFilteredJobs = {}; 
      let realFilteredJobs = {};

      // First, filter jobs by all categories based distance/location
      Object.values(jobs).forEach((job) => {
        if (!query["Matching Schema"]) {
          if (allFieldMatch(job, query)) {
            let newJob = {...job};
            newJob.duration = "Not applicable (no location specified)";
            fakeFilteredJobs[newJob.company] = newJob;
          }
        } else if (query["Matching Schema"].includes("Match At Least One Field")) {
          if (oneFieldMatch(job, query)) {
            let newJob = {...job};
            newJob.duration = "Not applicable (no location specified)";
            fakeFilteredJobs[newJob.company] = newJob;
          }
        } else {
          if (allFieldMatch(job, query)) {
            let newJob = {...job};
            newJob.duration = "Not applicable (no location specified)";
            fakeFilteredJobs[newJob.company] = newJob;
          }
        }})

      async function underLimit(job) {
        for (let place of job.locations) {
          const data = await realGetTime(location.place, place);
       
          for (let row of data.rows) {
            for (let i = 0; i < row.elements.length; i++) {
              const element = row.elements[i];

              if (element.duration && element.duration.value <= parseLimit(location.limit)) {
                let newJob = jobs[job.company];
                newJob['duration'] = `${element.duration.text} (From: ${location.place}) (To: ${data.destinationAddresses[i]})`;
                realFilteredJobs[job.company] = newJob;
              }
            }
          }
        }
      }

      /*
       Then, filter the jobs by distance/location, if applicable
       using `underLimit()`^^ as a helper function
      */
      if (location.place !== "" && location.limit !== "") {
          await Promise.all(Object.values(fakeFilteredJobs).map(async (job) => {
          await underLimit(job)
        }));
        setFilteredJobs(realFilteredJobs)
      } else {
        setFilteredJobs(fakeFilteredJobs);
      }
    }

  // Makes 1st letter of a word uppercase
  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /*
    Compute the correct time limit to filter jobs by
    (i.e. no more than 'x' hours and 'y' mins away)
  */
  function parseLimit (limit) {
    let limitArr = limit.split(' ');
    let parsedLimit;
    if (limitArr.length === 4) {
      parsedLimit = limitArr[0] * 3600 + limitArr[2] * 60
    } else if (limitArr[1][0] === "h") {
      parsedLimit = limitArr[0] * 3600
    } else if (limitArr[1][0] === "m") {
      parsedLimit = limitArr[0] * 60
    }
    return parsedLimit
  }

  /*
   Update both the starting locaiton & the time limit to filter jobs by
   if/when these inputs change
  */
  function handleLocation(e) {
    let newQuery = {...location}
    newQuery["place"] = e.target.value;
    setLocation(newQuery)
  }

  function handleLimit(e) {
    let newQuery = {...location}
    newQuery["limit"] = e.target.value;
    setLocation(newQuery)
  }

  // Determine jobs that match ALL input categories from the job filter
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
        for (let shift of value) {
          if (!job.shifts.includes(shift.toLowerCase())) {
            return false;
          }
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
        for (let shift of value) {
          if (job.shifts.includes(shift)) {
            return true;
          }
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

  // Render the application!!!
  return (
    <React.Fragment>
      {(!loggedIn) ?   // If not logged in, prompt the user to enter the correct access code
      <div className="w-screen h-screen flex items-center justify-center border">
        <div className="w-1/3 h-4/6 border flex flex-col justify-center item-center"> 
          <div className="w-4/6 ml-5 mr-5">Access Code</div>
          <input type="text" className="w-auto ml-5 mr-5 h-10 border flex items-center justify-center" onChange={(e) => setCode(e.target.value)}></input>
          <br></br>
          <button className="w-auto flex ml-5 mr-5 justify-center items-center onclick-hover border" onClick={() => {
            if (code === codeStatic) {
              setLoggedIn(true)
            } else {
              alert("Incorrect Password")
            }
          }}>Submit</button>
        </div>
      </div>
      :
      selected ?   // If clicked on ("selected"), display specific information for a given job
        <div className="w-screen h-screen flex items-center justify-center">
          <JobDetailModal selected={selected} setSelected={setSelected}></JobDetailModal>
        </div>
         :   // Else, display the job filter column + the list of all matching jobs
        <div className="w-screen h-screen">
          <br></br>
          <div className="w-auto h-auto font-sans text-6xl flex flex-row justify-center items-center">
            World Relief Chicago Job Match
          </div>
          <CSVToJSON setJobs={setJobs} setFilteredJobs={setFilteredJobs}></CSVToJSON>

          {/* Encapsulates both columns */}
          <div className="w-full h-full flex justify-around flex-row">

              {/* Column 1: Job Filtering Inputs */}
              <div className="w-5/12 h-auto border rounded-lg shadow-2xl flex flex-col items-center justify-start overflow-y-auto">
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

            {/* Column 2: Job List */}
            <div 
              className="w-6/12 h-full border rounded-lg shadow-2xl flex flex-col justify-center items-center overflow-y-auto">
              <JobList jobList={filteredJobs} setSelected={setSelected}/>
            </div>
          </div>
          <br></br>
          <br></br>
        </div> 
      }
    </React.Fragment>
    
  );
}

export default App;
