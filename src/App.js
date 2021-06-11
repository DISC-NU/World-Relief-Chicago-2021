import './App.css';
import React, { useState, useEffect } from 'react';
import { CSVToJSON } from './components/FileUpload';
import { JobDetailModal } from './components/JobDetailModal';
import { InputList } from './components/InputList';
import { JobList } from './components/JobList';
import { Loader } from "@googlemaps/js-api-loader";
import firebase from 'firebase/app';
import 'firebase/database';

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCMqVcop1xb6i57BGhBQmQVrviUWLP1m_I",
  authDomain: "disc-wrcmatch.firebaseapp.com",
  databaseURL: "https://disc-wrcmatch-default-rtdb.firebaseio.com",
  projectId: "disc-wrcmatch",
  storageBucket: "disc-wrcmatch.appspot.com",
  messagingSenderId: "124137228052",
  appId: "1:124137228052:web:5599accd788aaafde36401"
};

firebase.initializeApp(firebaseConfig);

// Actual app
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
  const [location, setLocation] = useState({place: '', limit: ''})
  const fields = ['Matching Schema', 'English', 'Shifts', 'Billingual', 'Weekend']; // (5)
  const options = [
    ['Match At Least One Field'], 
    ['None', 'Basic', 'Intermediate', 'Advanced'],
    ['Morning','Afternoon','Night'], 
    ['Yes'],
    ['Yes']
  ];

  // Check whether logged in or not
  const [loggedIn, setLoggedIn] = useState(true);

  /* async function handleOnLogin(values) {
    const { email, password } = values
    setSignInError(null)
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      route.params.roles.role === 'careTeam'
        ? navigation.navigate('ViewPatientsScreen') // Care team goes here
        : navigation.navigate('MainTasksScreen', {
            user: { id: 'Chris' },
            role: 'patient',
          }) // Patients/caregiver goes here
      // (Temporarily) always navigate to Chris's account
    } catch (error) {
      setSignInError(error.message)
    }
  }

  async function handleOnSignUp(values) {
    const { name, email, password } = values
    setSignInError(null)
    try {
      const authCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      const user = authCredential.user
      await user.updateProfile({ displayName: name })
      route.params.roles.role === 'careTeam'
        ? navigation.navigate('ViewPatientsScreen') // Care team goes here
        : navigation.navigate('MainTasksScreen', { user }) // Patients/caregiver goes here
    } catch (error) {
      setSignInError(error.message)
    }
  }

  async function handleOnSubmit(values) {
    return values.confirmPassword
      ? handleOnSignUp(values)
      : handleOnLogin(values)
  } */

  async function handleClick() {
      let fakeFilteredJobs = {}; 
      let realFilteredJobs = {};

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

          console.log("job: ", job)
       
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

      if (location.place != "" && location.limit != "") {
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
    let parsedLimit;
    if (limitArr.length == 4) {
      parsedLimit = limitArr[0] * 3600 + limitArr[2] * 60
    } else if (limitArr[1][0] == "h") {
      parsedLimit = limitArr[0] * 3600
    } else if (limitArr[1][0] == "m") {
      parsedLimit = limitArr[0] * 60
    }
    console.log("THIS WAS THE LIMIT:", limit)
    console.log("THIS WAS PARSED LIMIT:", parsedLimit)
    return parsedLimit
  }

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

  return (
    <React.Fragment>
      {loggedIn ?
      <div>
        <input type="text"></input>
        <button>Submit?</button>
      </div>
      :
      selected ? 
        <div className="w-screen h-screen flex items-center justify-center">
          <JobDetailModal selected={selected} setSelected={setSelected}></JobDetailModal>
        </div>
         :
        <div className="w-screen h-screen">
          <br></br>
          <div className="w-auto h-auto font-sans text-6xl flex flex-row justify-center items-center">
            World Relief Chicago Job Match
          </div>
          <CSVToJSON setJobs={setJobs} setFilteredJobs={setFilteredJobs}></CSVToJSON>

          {/* Encapsulates both columns */}
          <div className="w-full h-full flex justify-around flex-row">

              {/* Job Filtering Inputs */}
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

            {/* Job List */}
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
