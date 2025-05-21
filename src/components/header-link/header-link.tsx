import clsx from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './header-link.module.css';

type Props = {
  children?: ReactNode;
  onClick?: MouseEventHandler;
  route: string;
  text: string;
}

const HeaderLink = ({ children, onClick, route, text }: Props) => {
  return (
    <NavLink
      className={
        ({ isActive }) => clsx(styles.link, isActive ? styles.link_active : '', 'pt-4', 'pr-5', 'pb-4', 'pl-5')
      }
      onClick={onClick}
      to={route}
    >
      {children}
      <span className={clsx('ml-2')}>{text}</span>
    </NavLink>
  );
};

export default HeaderLink;
