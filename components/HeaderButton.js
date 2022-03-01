import {  Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.PrimaryColor}
    />
  );
};

export default CustomHeaderButton;
