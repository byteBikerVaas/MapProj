import { useState } from "react";
import axios from "axios";
import { Button, Container, Typography } from "@mui/material";

function UploadForm() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("data", file);

      await axios.post("http://localhost:3001/maps/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Upload JSON File
      </Typography>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
    </Container>
  );
}

export default UploadForm;
