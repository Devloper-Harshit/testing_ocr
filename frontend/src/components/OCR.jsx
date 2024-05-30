
import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';


const OCR = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '',phone: '', company_address: '' });
    const [webcamEnabled, setWebcamEnabled] = useState(true);
    const webcamRef = useRef(null);
  
    const videoConstraints = {                                // trying
         facingMode: { exact: 'environment' },
       };

    const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
      setWebcamEnabled(false); // Turn off webcam after capture
      readImage(imageSrc);
    }, [webcamRef]);
  
    const readImage = (imageSrc) => {
      Tesseract.recognize(
        imageSrc,
        'eng',
        {
          logger: (m) => console.log(m),
        }
      ).then(({ data: { text } }) => {
        // Process the recognized text and fill the form fields
        const lines = text.split('\n');
        setFormData({
          name: lines[0] || '',
          email: lines[1] || '',
          phone: lines[2] || '',
          company_address: lines[3] || '',
        });
      });
    };
    
    // const handleSubmit = () => {
    //   alert("Data uploaded successfully");
      // event.preventDefault();
      // console.log(formData);

      
      // const requestOptions = {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(formData)
      // };
      // fetch('http://localhost:3000/formdata', requestOptions)
      //     .then(response => response.json())
  

    //   fetch('http://localhost:5000/formdata', {               //need to change if server is being change
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(formData => {
    //     console.log('Success:', formData);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
      
    
  
  // };
  


  const handleSubmit = (event) => {
    // event.preventDefault(); // Prevent default form submission behavior
    alert("Data uploaded successfully");
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
  
    fetch('http://localhost:5000/formdata', requestOptions)
      .then(response => response.json())
      .then(data => {
        // console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
    const handleRecapture = () => {
      setWebcamEnabled(true);
      setImageSrc(null);
    };
  
    return (
      <div>
        <h1>Image Capture and OCR Form</h1>
        {webcamEnabled ? (
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}         //trying 
            />
            <button onClick={capture}>Capture</button>
          </div>
        ) : (
          <button onClick={handleRecapture}>Recapture</button>
        )}
        {imageSrc && (
          <div>
            <h2>Captured Image:</h2>
            <img src={imageSrc} alt="Captured" />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label>Email Address:</label>
            <input
              type="text"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <label>Company Address:</label>
            <input
              type="text"
              value={formData.company_address}
              onChange={(e) => setFormData({ ...formData, company_address: e.target.value })}
              
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
}

export default OCR;
