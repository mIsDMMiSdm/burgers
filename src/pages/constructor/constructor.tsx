import clsx from 'clsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import styles from './constructor.module.css';

const ConstructorPage = () => {

  return (
    <div className={clsx(styles.container)}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/>
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
};

export default ConstructorPage;
