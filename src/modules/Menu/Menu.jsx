import { NavLink } from 'react-router-dom';
import styles from '../Menu/Menu.module.css';

const getClassName = ({ isActive }) => {
  const className = isActive ? `${styles.link} ${styles.active}` : styles.link;
  return className;
};
const Menu = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.menu}>
        <li>
          <NavLink className={getClassName} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={getClassName} to="/movies">
            Movies
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
