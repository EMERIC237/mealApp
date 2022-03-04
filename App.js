import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import MealsNavigator from "./navigation/MealsNavigator";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import mealsReducer from "./store/reducers/mealsReducer";
import { Provider } from "react-redux";

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});
const composeEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
const store = createStore(rootReducer, composeEnhancer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}
