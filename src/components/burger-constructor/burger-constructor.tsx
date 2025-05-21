import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { createOrder } from '../../services/asyncThunk/orderThunk';
import { ensureResult } from '../../services/helpers/ensureResult';
import { getCart, getOrder, getUser } from '../../services/helpers/getSelector';
import { addIngredient, moveIngredients } from '../../services/slices/cartSlice';
import { closeAllModal, setModalNotification } from '../../services/slices/modalSlice';
import { Ingredient } from '../../types/Ingredient';
import { PATH } from '../../utils/config';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const { cart } = useAppSelector(getCart);
  const { user } = useAppSelector(getUser);
  const { fetch } = useAppSelector(getOrder);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isButtonDisabled = useMemo(() => cart.bun === null
    || cart.ingredients.length === 0 || fetch, [cart.bun, cart.ingredients.length, fetch]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient: Ingredient) {
      if (cart.bun === null && ingredient.type !== 'bun') {
        dispatch(setModalNotification('Сначала выберите булку!'));
        setTimeout(() => dispatch(closeAllModal()), 2000);
      } else if (ingredient.type !== 'bun') {
        dispatch(addIngredient({
          ingredient: {
            ...ingredient,
            _uid: uuid()
          }
        }));
      } else {
        dispatch(addIngredient({ ingredient: ingredient }));
      }
    }
  });

  const redirectToLoginPage = useCallback(() => {
    navigate(PATH.LOGIN, { replace: true, state: { background: location.pathname } });
  }, [location.pathname, navigate]);

  const handleBurgerConstructorButton = useCallback(
    () => (user.isLogin)
      ? cart.bun !== null && dispatch(createOrder({
      bun: cart.bun,
      ingredients: cart.ingredients
    }))
      : redirectToLoginPage(), [cart, dispatch, redirectToLoginPage, user.isLogin]);


  const cartPrice = useMemo(() => {
    if (cart.bun !== null) {
      const bunPrice = cart.bun.price;
      const ingredientsPrice = cart.ingredients.reduce((acc, current) => acc + current.price, 0);
      return bunPrice + ingredientsPrice + bunPrice;
    } else {
      return 0;
    }
  }, [cart.bun, cart.ingredients]);

  const findIngredient = useCallback(
    (id: string) => {
      const ingredient = ensureResult(cart.ingredients.find(item => item._id === id));
      return {
        index: cart.ingredients.indexOf(ingredient),
        ingredient,
      };
    },
    [cart],
  );

  const moveIngredient = useCallback(
    (id: string, atIndex: number) => {
      const { index, ingredient } = findIngredient(id);
      dispatch(moveIngredients({ atIndex, index, ingredient }));
    },
    [dispatch, findIngredient],
  );

  const [{ isHover: isIngredientHover }, refDrop] = useDrop({
    accept: 'ingredientSort',
    collect: (monitor) => ({ isHover: monitor.isOver() }),
  });

  const ingredientElements = cart.ingredients.map(
    (ingredient, index) => (
      <ConstructorIngredient
        index={index}
        ingredient={ingredient}
        key={ingredient._uid}
        moveIngredient={moveIngredient}
      />
    )
  );

  return (
    <>
      <section
        className={clsx(styles.section, 'mt-25', isHover && styles.cart__list_hover_active)}
        ref={dropTarget}
      >
        {
          !cart.bun
            ? (
              <h1
                className={
                  clsx('text', 'text_type_main-large', 'pr-4', styles.title)
                }
              >
                Выберите булку
              </h1>
            )
            : (
              <ul
                className={clsx(styles.cart__list)}
              >
                <li
                  className={clsx(styles.cart__item)}
                >
                  <ConstructorElement
                    extraClass={clsx(styles.cart__bun)}
                    isLocked={true}
                    price={cart.bun.price}
                    text={`${cart.bun.name} (верх)`}
                    thumbnail={cart.bun.image}
                    type={'top'}
                  />
                </li>
                <li>
                  <ul
                    className={clsx(styles.cart__ingredients_list, isIngredientHover && styles.cart__ingredients_list_hovered)}
                    ref={refDrop}
                  >
                    {ingredientElements}
                  </ul>
                </li>
                <li
                  className={clsx(styles.cart__item)}
                >
                  <ConstructorElement
                    extraClass={clsx(styles.cart__bun)}
                    isLocked={true}
                    price={cart.bun.price}
                    text={`${cart.bun.name} (низ)`}
                    thumbnail={cart.bun.image}
                    type={'bottom'}
                  />
                </li>
              </ul>
            )
        }
        <div className={clsx(styles.cart__footer)}>
          <div className={clsx(styles.cart__price)}>
            <span className={clsx('text', 'text_type_digits-medium')}>
              {cartPrice}
            </span>
            <span>
              <CurrencyIcon type={'primary'}/>
            </span>
          </div>
          <Button
            disabled={isButtonDisabled}
            extraClass={clsx(styles.button)}
            htmlType="button"
            onClick={handleBurgerConstructorButton}
            size="large"
            type="primary"
          >
            {
              fetch
                ? 'Оформляем заказ...'
                : 'Оформить заказ'
            }
          </Button>
        </div>
      </section>
    </>
  );
};

export default BurgerConstructor;
