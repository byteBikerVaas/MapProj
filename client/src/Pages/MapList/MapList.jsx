// MapList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Toolbar from "../../Components/Toolbar/Toolbar";
import MapCard from "../../Components/Mapcard/MapCard"; // Import MapCard component
import styles from "./MapList.module.css"; // Import CSS for MapList

function MapList() {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMap, setSelectedMap] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/maps");
        setMaps(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/maps/download/${id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${id}.json`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleCardSelect = (mapId) => {
    setSelectedMap(mapId === selectedMap ? null : mapId);
  };

  return (
    <div className={styles.container}>
      <Toolbar handleDownload={handleDownload} selectedMap={selectedMap} />
      {loading ? (
        <div>Loading...</div>
      ) : maps.length === 0 ? (
        <div>No maps uploaded yet.</div>
      ) : (
        <div className={styles.mapList}>
          {maps.map((map) => (
            <MapCard
              key={map._id}
              map={map}
              handleDownload={handleDownload}
              onCardSelect={handleCardSelect}
              isSelected={map._id === selectedMap}
              className={styles.mapCard} // Apply CSS class for MapCard
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MapList;
