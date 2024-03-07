import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stage, Graphics } from "@pixi/react";
import { useParams } from "react-router-dom";

function MapDetails() {
  const { id } = useParams();
  const [mapDetails, setMapDetails] = useState(null);
  const scalingFactor = 0.04; // Adjust the scaling factor as needed

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

  const renderRectangles = () => {
    if (!mapDetails) return null;

    const { tiles } = mapDetails;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    tiles.forEach((rectangle) => {
      const { size_info, world_coordinate } = rectangle;
      const [up, right, down, left] = size_info;
      const [x, y] = JSON.parse(world_coordinate); // Parse the world coordinate
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + right);
      maxY = Math.max(maxY, y + down);
    });

    return tiles.map((rectangle, index) => {
      const { size_info, world_coordinate } = rectangle;
      const [up, right, down, left] = size_info;
      const [x, y] = JSON.parse(world_coordinate); // Parse the world coordinate
      const centerX = (x - minX + maxX) * scalingFactor + 400; // Calculate center X
      const centerY = (y - minY + maxY) * scalingFactor; // Calculate center Y
      const rectWidth = (right + left) * scalingFactor; // Scale width
      const rectHeight = (up + down) * scalingFactor; // Scale height

      return (
        <Graphics
          key={index}
          draw={(g) => {
            g.clear();
            g.lineStyle(2, 0x00ff00, 1);
            g.beginFill(0x0000ff, 1); // Outline color and thickness
            g.drawRect(
              centerX - rectWidth + 100,
              centerY - rectHeight - 100,
              rectWidth,
              rectHeight
            ); // Adjust position to center
          }}
        />
      );
    });
  };

  return (
    <div style={{}}>
      <Stage
        width={window.innerWidth} // Adjust the width as needed
        height={window.innerHeight} // Adjust the height as needed
      >
        {renderRectangles()}
      </Stage>
    </div>
  );
}

export default MapDetails;
