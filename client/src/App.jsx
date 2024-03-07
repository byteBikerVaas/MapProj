
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import UploadForm from "./Pages/UploadForm/UploadForm";
import MapList from "./Pages/MapList/MapList";
import MapDetails from "./Pages/MapDetails/MapDetails";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/maps" element={<MapList />} />
          <Route path="/maps/:id" element={<MapDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
