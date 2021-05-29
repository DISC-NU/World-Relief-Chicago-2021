import React from 'react';
import { CSVReader } from 'react-papaparse';

// See here for original source code: 
// https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader1.js

const buttonRef = React.createRef();

export const CSVToJSON = ({setJobs, setFilteredJobs}) => {
  
  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  // Once we upload a file, update the `jobs` 
  // and `filteredJobs` variables in 'App.js'
  const handleOnFileLoad = (data) => {

    // JSON object to hold data about all jobs
    let jobList = {};

    // Remove the 1st entry in the JSON object
    // i.e. the columns at the top of the CSV file, which aren't an actual job
    data.shift();

    // Loop over each job object & parse it into a JSON object containing its correponding data
    data.forEach((job) => {
      let currentJob = {};
      let currentJobData = job.data;

      // Loop over each job field (company name, industry, english level, etc.)
      // and update the JSON object for the current job accordingly
      currentJobData.forEach((fieldData, index) => {
        let field;
        let fieldDataParsed = fieldData;
        index = parseInt(index);
    
        switch(index) {
          case 0:
            field = 'company';
            break;
          case 1:
            field = 'industry';
            break;
          case 2:
            field = 'english';
            fieldDataParsed = fieldData.toLowerCase();
            break;
          case 3:
            field = 'bilingual';
            fieldDataParsed = (fieldData.toLowerCase() === "true");
            break;
          case 4:
            field = 'locations';
            fieldDataParsed = fieldData.split(';');
            fieldDataParsed.forEach((location, index) => {
              fieldDataParsed[index] = location.trim();
            })
            break;
          case 5:
            field = 'shifts';
            let shiftsArray = fieldData.split(',');

            shiftsArray.forEach((shift, index) => {
              shiftsArray[index] = shift.trim().toLowerCase();
            })

            fieldDataParsed = shiftsArray;
            break;
          case 6:
            field = 'weekend';
            fieldDataParsed = (fieldData.toLowerCase() === "true");
            break;
          case 7:
            field = 'notes';
            break;
          default:
            field = 'INVALID';
            break;
        }

        /*
         Add current field to the `currentJob` JSON object, 
         which will be of the following form:

         {
           'company': // company name,
           'industry': // industry name,
           'english': {basic/intermediate/advanced}
           < etc. >
         }
      
        */
        if (field !== 'INVALID') {
          currentJob[field] = fieldDataParsed;
        }
      })
  

      /*
       Add the `currentJob` JSON object to our `jobList` JSON object, 
       which will be of the following form:

       {
        'Advocate Christ Medical Center': { ... },
        'Amazon': { ... },
        'Aramark': { ... },

        < etc. >
       }

       */
      jobList[job.data[0]] = currentJob;
    })

    // Update `jobs`and `filteredJobs` s/t the app 
    // now displays the list of jobs on the RHS
    setJobs(jobList);
    setFilteredJobs(jobList);
  };

  const handleOnError = (err) => {
    alert(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log(data);
  };

  const handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };
  

  return (
    <>
      <CSVReader
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noDrag
        onRemoveFile={handleOnRemoveFile}
      >
        {({ file }) => (
          <aside
            style={{
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10,
            }}
          >
            <button
              type="button"
              onClick={handleOpenDialog}
              style={{
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: 'green',
                height: 45,
                marginTop: 30,
                marginLeft: '5%',
                marginRight: '1%',
                width: '10%',
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              Browse file
            </button>
            <div
              style={{
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: 'black',
                height: 45,
                lineHeight: 2.5,
                marginTop: 30,
                marginBottom: 10,
                width: '40%',
              }}
            >
              {file && file.name}
            </div>
            <button
              style={{
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: 'red',
                height: 45,
                marginTop: 30,
                marginLeft: '1%',
                marginRight: '5%',
                paddingLeft: 20,
                paddingRight: 20,
              }}
              onClick={handleRemoveFile}
            >
              Remove
            </button>
          </aside>
        )}
      </CSVReader>
    </>
  );
}
