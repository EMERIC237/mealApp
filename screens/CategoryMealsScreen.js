import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import MealItem from "../components/MealItem";
import { CATEGORIES, MEALS } from "../data/dummy-data";

const CategoryMealsScreen = (props) => {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        imageUrl={itemData.item.imageUrl}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: { mealId: itemData.item.id },
          });
        }}
      />
    );
  };
  let catId = props.navigation.getParam("categoryId");
  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(catId)
  );
  return (
    <View>
      <FlatList
        data={displayedMeals}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  let catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
