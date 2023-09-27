import React, { useState, useRef } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fileUpload } from './API/fileUpload';

const App = () => {
  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      console.log('here');
      const formData = new FormData();
      formData.append('file', file);
      const response = await fileUpload(formData);
        inputFileRef.current.value = '';
        setFile(null);
        toast.success(response.data)
    }
    else {
      toast.error('Please Select any file')
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2>API Project: File Metadata Microservice</h2>

      <h3>Usage:</h3>
      <p>Please Upload a File ...</p>

      <div className="view">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputFileRef} 
            id="inputField"
            type="file"
            name="upfile"
            onChange={handleFileChange}
          />
          <button className="btn" type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
