// Import required libraries
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data"); // To handle form data for multipart requests

const uploadImages = async () => {
  const folderPath = "./images"; // Replace with your images folder path
  const files = fs.readdirSync(folderPath); // Read all files in the folder

  for (const file of files) {
    const filePath = path.join(folderPath, file); // Create full file path
    const formData = new FormData();
    formData.append("image", fs.createReadStream(filePath)); // Add file to the form data

    try {
      // Send POST request to the backend API
      const response = await axios.post("http://localhost:5000/api/images/upload", formData, {
        headers: {
          ...formData.getHeaders(), // Include headers for multipart form data
        },
      });
      console.log(`Uploaded ${file}:`, response.data); // Log success message
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message); // Log error message
    }
  }
};

// Call the function to start uploading images
uploadImages();
