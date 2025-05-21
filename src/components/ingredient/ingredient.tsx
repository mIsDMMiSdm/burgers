import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getCart } from '../../services/helpers/getSelector';
import { setModalIngredient } from '../../services/slices/modalSlice';
import { Ingredient as IngredientType } from '../../types/Ingredient';
import styles from './ingredient.module.css';

type Props = {
  ingredient: IngredientType;
}

const Ingredient = ({ ingredient }: Props) => {
  const { ingredientsCounter } = useAppSelector(getCart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const [, dragRef] = useDrag({
    item: ingredient,
    type: 'ingredient',
  });

  const handleIngredientClick = useCallback(() => {
    dispatch(setModalIngredient(ingredient));
    navigate(`/ingredients/${ingredient._id}`, { state: {background: location}})
  }, [dispatch, ingredient, location, navigate]);

  const ingredientCounter = useMemo(() => ingredientsCounter[ingredient._id] || 0, [ingredient._id, ingredientsCounter]);

  return (
    <>
      <li
        className={
          clsx(
            styles.ingredients__item,
          )
        }
        onClick={handleIngredientClick}
        ref={dragRef}

      >
        {!!ingredientCounter && <Counter
          count={+ingredientCounter}
          extraClass="m-1"
          size="default"
        />}
        <picture>
          <source
            media="(max-width: 480px)"
            srcSet={ingredient.image_mobile}
          />
          <source
            media="(min-width: 1400px)"
            srcSet={ingredient.image_large}
          />
          <img
            alt={ingredient.name}
            className={clsx(styles.ingredients__image)}
            src={ingredient.image}
          />
        </picture>
        <div
          className={clsx(styles.ingredients__price)}
        >
            <span
              className={clsx('text', 'text_type_digits-default')}
            >
              {ingredient.price}
            </span>
          <CurrencyIcon type={'primary'}/>
        </div>

        <h3
          className={clsx(styles.ingredients__name, 'text', 'text_type_main-default')}
        >
          {ingredient.name}
        </h3>
      </li>
    </>
  );
};

export default memo(Ingredient);
