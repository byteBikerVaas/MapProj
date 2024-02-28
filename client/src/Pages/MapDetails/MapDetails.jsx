// MapDetails.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./MapDetails.module.css";

function MapDetails() {
  const { id } = useParams();
  const [mapDetails, setMapDetails] = useState(null);

  useEffect(() => {
    const fetchMapDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/maps/${id}`);
        setMapDetails(response.data);
      } catch (error) {
        console.error("Error fetching map details:", error);
      }
    };
    fetchMapDetails();
  }, [id]);

  if (!mapDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.goBackButton}
        onClick={() => window.history.back()}
      >
        Go back
      </button>
      <h3 className={styles.title}>Map Details</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Store Status</th>
            <th>Zone</th>
            <th>Sector</th>
            <th>Barcode</th>
            <th>Bot ID</th>
            <th>Blocked</th>
            <th>Size Info</th>
            <th>MSU Dimensions</th>
            <th>World Coordinate</th>
            <th>World Coordinate Reference Neighbour</th>
            <th>Coordinate</th>
          </tr>
        </thead>
        <tbody>
          {mapDetails.tiles.map((map, index) => (
            <tr key={index}>
              <td>{map.store_status}</td>
              <td>{map.zone}</td>
              <td>{map.sector}</td>
              <td>{map.barcode}</td>
              <td>{map.botid}</td>
              <td>{map.blocked ? "Yes" : "No"}</td>
              <td>{map.size_info && map.size_info.join(", ")}</td>
              <td>{map.msu_dimensions}</td>
              <td>{map.world_coordinate}</td>
              <td>{map.world_coordinate_reference_neighbour}</td>
              <td>{map.coordinate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MapDetails;
