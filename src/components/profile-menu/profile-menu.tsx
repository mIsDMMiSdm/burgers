import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { useLogout } from '../../hooks/useLogout';
import { PATH } from '../../utils/config';
import styles from './profile-menu.module.css';

const ProfileMenu = () => {
  const { handleLogout } = useLogout();

  return (
    <nav>
      <ul className={clsx('page__list', styles.list)}>
        <li className={clsx(styles.item)}>
          <NavLink
            className={({ isActive }) =>
              clsx(isActive ? styles.link_active : styles.link, 'page__link', 'text', 'text_type_main-medium')}
            end
            to={PATH.PROFILE}
          >
            Профиль
          </NavLink>
        </li>
        <li className={clsx(styles.item)}>
          <NavLink
            className={({ isActive }) =>
              clsx(isActive ? styles.link_active : styles.link, 'page__link', 'text', 'text_type_main-medium')}
            end
            to={PATH.ORDERS}
          >
            История заказов
          </NavLink>
        </li>
        <li className={clsx(styles.item)}>
          <button
            className={clsx(styles.link, styles.button, 'page__link', 'text', 'text_type_main-medium')}
            onClick={handleLogout}
          >
            Выход
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileMenu;
