import React from "react";
import MealList from "../components/MealList";
import { CATEGORIES } from "../data/dummy-data";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";
const CategoryMealsScreen = (props) => {
  let catId = props.navigation.getParam("categoryId");
  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter((meal) =>
    meal.categoryIds.includes(catId)
  );
  if (displayedMeals.length === 0) {
    return (
      <View style={StyleSheet.content}>
        <DefaultText>No meals found, maybe check your filters</DefaultText>
      </View>
    );
  }
  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  let catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

const style = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CategoryMealsScreen;
