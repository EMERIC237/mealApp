import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import FavoriteScreen from "../screens/FavoriteScreen";

const hearderStyleProps = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.PrimaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.PrimaryColor,
};
const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: "Meals categories",
      },
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.PrimaryColor : "",
      },
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.PrimaryColor,
    },
  }
);

// const MealsFavTabsNavigator = createBottomTabNavigator({
//   Meals: MealsNavigator,
//   Favorites: FavoriteScreen,
// });

export default createAppContainer(MealsNavigator);
