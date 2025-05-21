import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { useAppDispatch } from '../../hooks/useRedux';
import { removeIngredient } from '../../services/slices/cartSlice';
import { Ingredient } from '../../types/Ingredient';
import styles from './constructor-ingredient.module.css';

type Props = {
  index: number;
  ingredient: Ingredient;
  moveIngredient: (id: string, index: number) => void;
}

const IngredientElement = ({ index, ingredient, moveIngredient }: Props) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement | null>(null);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      item: { id: ingredient._id, index },
      type: 'ingredientSort'
    }),
    [index, moveIngredient],
  );

  const [, drop] = useDrop(() => ({
      accept: 'ingredientSort',
      hover({ id }: { id: string }) {
        (id !== ingredient._id) && moveIngredient(id, index);
      },
    }),
    [moveIngredient],
  );

  const handleDeleteIngredient = () => dispatch(removeIngredient({ _id: ingredient._id, index: index }));

  drag(drop(ref));

  return (
    <li
      className={clsx(styles.item, styles.item_draggable, isDragging && styles.item_dragging)}
      ref={ref}
    >
      <DragIcon type="primary"/>
      <ConstructorElement
        handleClose={handleDeleteIngredient}
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
      />
    </li>
  );
};

export default memo(IngredientElement);
