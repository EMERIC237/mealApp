import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { filterMeal } from "../store/actions/mealsActions";

const FiltersSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.PrimaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.PrimaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};
const FiltersScreen = (props) => {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    return {
      isGlutenFree: isGlutenFree,
      isLactoseFree: isLactoseFree,
      isVegan: isVegan,
      isVegetarian: isVegetarian,
    };
    console.log(appliedFilters);
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);
  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  const dispatch = useDispatch();
  const savefiltersHandler = useCallback(
    (options) => {
      dispatch(filterMeal(options));
    },
    [dispatch]
  );
  useEffect(() => {
    props.navigation.setParams({ saveHandler: savefiltersHandler });
  }, [savefiltersHandler]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FiltersSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={(newValue) => {
          setIsGlutenFree(newValue);
        }}
      />
      <FiltersSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={(newValue) => {
          setIsLactoseFree(newValue);
        }}
      />
      <FiltersSwitch
        label="Vegan"
        state={isVegan}
        onChange={(newValue) => {
          setIsVegan(newValue);
        }}
      />
      <FiltersSwitch
        label="Vegeterian"
        state={isVegetarian}
        onChange={(newValue) => {
          setIsVegetarian(newValue);
        }}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  const options = navData.navigation.getParam("save");
  const saveFilters = navData.navigation.getParam("saveHandler");
  return {
    headerTitle: "Filtered meals",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={() => {
            const filterOptions = options();
            console.log(filterOptions);
            saveFilters(filterOptions);
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default FiltersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});
