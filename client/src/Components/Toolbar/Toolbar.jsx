import styles from "./Toolbar.module.css";
import { useNavigate } from "react-router-dom";

const Toolbar = ({ handleDownload, selectedMap }) => {
  const navigate = useNavigate();
  const nav = (id) => {
    navigate(`/maps/${id}`);
  };
  return (
    <div className={styles.toolbar}>
      <button
        disabled={!selectedMap}
        onClick={() => nav(selectedMap)}
        className={styles.button}
      >
        View
      </button>
      <button
        disabled={!selectedMap}
        onClick={() => handleDownload(selectedMap)}
        className={styles.button}
      >
        Download
      </button>
    </div>
  );
};

export default Toolbar;
