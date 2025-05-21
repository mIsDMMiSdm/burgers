import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAppSelector } from '../../hooks/useRedux';
import { getIngredients } from '../../services/helpers/getSelector';
import { TabShape } from '../../types/TabShape';
import { ingredientTabs } from '../../utils/config';
import { TABS } from '../../utils/constants';
import Ingredient from '../ingredient/ingredient';
import IngredientsContainer from '../ingredients-container/ingredients-container';
import Tabs from '../tabs/tabs';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const [tabs] = useState<TabShape[]>(ingredientTabs);
  const [currentTab, setCurrentTab] = useState(TABS.BUN);
  const [isScrollable, setIsScrollable] = useState(true);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewMain] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (isScrollable) {
      if (inViewBuns) {
        setCurrentTab(TABS.BUN);
      } else if (inViewSauces) {
        setCurrentTab(TABS.SAUCE);
      } else if (inViewMain) {
        setCurrentTab(TABS.MAIN);
      }
    }
  }, [inViewBuns, inViewMain, inViewSauces, isScrollable]);

  const scrollToId = useCallback((tab: string) => {
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView();
      setCurrentTab(tab);
    }
  }, []);

  const handleTabClick = useCallback((value: string) => {
    setCurrentTab(value);
    setIsScrollable(false);
    scrollToId(value);
    return () => setIsScrollable(true);
  }, [scrollToId]);

  const { ingredients } = useAppSelector(getIngredients);

  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
  const main = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);

  const bunElements = useMemo(() => buns.map((item) => <Ingredient ingredient={item} key={item._id}/>), [buns]);
  const sauceElements = useMemo(() => sauces.map((item) => <Ingredient ingredient={item} key={item._id}/>), [sauces]);
  const mainElements = useMemo(() => main.map((item) => <Ingredient ingredient={item} key={item._id}/>), [main]);

  return (
    <section className={clsx(styles.section, 'mt-10')}>
      <h1
        className={clsx('text', 'text_type_main-large')}
      >
        Соберите бургер
      </h1>
      <Tabs
        changeTab={handleTabClick}
        currentTab={currentTab}
        tabs={tabs}
      />
      <ul
        className={clsx(styles.ingredients)}
      >
        <li>
          <IngredientsContainer ref={bunsRef} title={'Булки'} type={TABS.BUN}>
            {bunElements}
          </IngredientsContainer>
        </li>
        <li>
          <IngredientsContainer ref={saucesRef} title={'Соусы'} type={TABS.SAUCE}>
            {sauceElements}
          </IngredientsContainer>
        </li>
        <li>
          <IngredientsContainer ref={mainsRef} title={'Начинка'} type={TABS.MAIN}>
            {mainElements}
          </IngredientsContainer>
        </li>
      </ul>
    </section>
  );
};

export default BurgerIngredients;
