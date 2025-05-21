import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';

import { TabShape } from '../../types/TabShape';
import styles from './tabs.module.css';

type Props = {
  changeTab: (currentTab: string) => void;
  currentTab: string;
  tabs: TabShape[];
}

const Tabs = ({ changeTab, currentTab, tabs }: Props) => {
  return (
    <ul
      className={clsx(styles.tabs_list)}
    >
      {
        tabs.map((tab) => (
          <li
            key={tab.type}
          >
            <Tab
              active={currentTab === tab.type}
              onClick={(currentTab: string) => changeTab(currentTab)}
              value={tab.type}
            >
              {tab.name}
            </Tab>
          </li>
        ))
      }
    </ul>
  );
};

export default Tabs;
