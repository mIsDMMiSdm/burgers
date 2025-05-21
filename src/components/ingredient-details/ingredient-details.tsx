import clsx from 'clsx';

import { Ingredient } from '../../types/Ingredient';
import styles from './ingredient-details.module.css';

type Props = {
  ingredient: Ingredient;
}
const IngredientDetails = ({ ingredient }: Props) => {
  return (
    <div className={clsx(styles.ingredientDetail)}>
      <picture className={clsx(styles.ingredientDetail__picture)}>
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
          className={clsx(styles.ingredientDetail__image)}
          src={ingredient.image}
        />
      </picture>
      <div
        className={clsx(
          styles.ingredientDetail__content,
          'mt-4'
        )}
      >
        <h4
          className={clsx(
            styles.ingredientDetail__title,
            'text',
            'text_type_main-medium'
          )}
        >
          {ingredient.name}
        </h4>
        <div
          className={clsx(
            styles.ingredientDetail__nutritionFacts,
            'mt-8',
            'text',
            'text_type_main-default',
            'text_color_inactive'
          )}
        >
          <span>Калории,ккал</span>
          <span>Белки, г</span>
          <span>Жиры, г</span>
          <span>Углеводы, г</span>
          <span
            className={clsx('text_type_digits-default')}
          >
              {ingredient.calories}
            </span>
          <span
            className={clsx('text_type_digits-default')}
          >
              {ingredient.proteins}
            </span>
          <span
            className={clsx('text_type_digits-default')}
          >
              {ingredient.fat}
            </span>
          <span
            className={clsx('text_type_digits-default')}
          >
              {ingredient.carbohydrates}
            </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
