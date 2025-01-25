import { useState } from "react";

const FileUpload = ({ onFileUpload }) => {
 
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const newData = JSON.parse(e.target.result);
          onFileUpload(newData);
        } catch (error) {
          console.error('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return <input type="file" onChange={handleFileUpload} className="bg-gray-400 my-4 mx-auto p-2 cursor-pointer"/>;
     
}

export default FileUpload;