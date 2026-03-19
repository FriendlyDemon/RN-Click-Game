import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import { Upgrade } from "../classes/Upgrades";

function Shovel(props: { clicker: Upgrade; buy: CallableFunction }) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      onPress={() => {
        props.buy(props.clicker);
      }}
    >
      <Text>Shovel Level: {props.clicker.getLevel()}</Text>
      <Text style={styles.ShovelText}>
        Cost: {props.clicker.getCurrentCost()}{" "}
        <Image style={styles.icons} source={require("../assets/gold.png")} />
      </Text>
      <Text style={styles.ShovelText}>
        <Image style={styles.icons} source={require("../assets/bone.png")} />{" "}
        per Click: {props.clicker.getLevel() + 1}
      </Text>
    </TouchableOpacity>
  );
}

export default Shovel;
