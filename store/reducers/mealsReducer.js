import { MEALS } from "../../data/dummy-data";
import { FILTER_MEAL, TOGGLE_FAVORITE } from "../actions/mealsActions";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      const updatedMeals = [...state.favoriteMeals];
      updatedMeals.splice(existingIndex, 1);
      if (existingIndex >= 0) {
        return { ...state, favoriteMeals: updatedMeals };
      } else {
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(
            state.meals.find((meal) => meal.id === action.mealId)
          ),
        };
      }
    case FILTER_MEAL:
      let { isGlutenFree, isLactoseFree, isVegan, isVegetarian } =
        action.options;
      let newFilteredMeals = state.meals.filter((meal) => {
        if (isGlutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (isLactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (isVegan && !meal.isVegan) {
          return false;
        }
        if (isVegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: newFilteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;
