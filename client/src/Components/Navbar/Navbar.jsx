import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.navLink}>
        Upload
      </Link>
      <Link to="/maps" className={styles.navLink}>
        Maps
      </Link>
    </div>
  );
};

export default Navbar;
