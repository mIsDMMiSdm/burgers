import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useRedux';
import { updateUser } from '../../services/slices/userSlice';
import { PATH } from '../../utils/config';
import HeaderLink from '../header-link/header-link';
import styles from './header.module.css';


const Header = () => {
  const dispatch = useAppDispatch();

  const handleOpenProfile = () => {
    dispatch(updateUser({ isLogout: false }))
  };

  return (
    <header
      className={
        clsx(styles.header, 'text', 'text_type_main-default', 'pt-4', 'pb-4')
      }
    >
      <div className={clsx(styles.content)}>
        <nav>
          <ul className={clsx(styles.navigation)}>
            <li>
              <HeaderLink route={PATH.HOME} text={'Конструктор'}>
                <BurgerIcon type="primary"/>
              </HeaderLink>
            </li>
            <li>
              <HeaderLink route={PATH.FEED} text={'Лента заказов'}>
                <ListIcon type="secondary"/>
              </HeaderLink>
            </li>
          </ul>
        </nav>

        <NavLink className={clsx(styles.logo)} to={PATH.HOME}>
          <Logo></Logo>
        </NavLink>
        <div className={clsx(styles.profile)}>
          <HeaderLink onClick={() => handleOpenProfile()} route={PATH.PROFILE} text={'Личный кабинет'}>
            <ProfileIcon type="secondary"/>
          </HeaderLink>
        </div>
      </div>
    </header>
  );
};


export default Header;
