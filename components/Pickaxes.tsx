import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import { Upgrade } from "../classes/Upgrades";
import values from "../values/Values";

function Pickaxes(props: { pickaxes: Upgrade; buy: CallableFunction }) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      onPress={() => {
        props.buy();
      }}
    >
      <Text>Pickaxe Level: {props.pickaxes.getLevel()}</Text>
      <Text style={styles.MinersText}>
        Cost: {props.pickaxes.getCurrentCost()}{" "}
        <Image style={styles.icons} source={require("../assets/gold.png")} />
      </Text>
      <Text style={styles.MinersText}>
        Base{" "}
        <Image style={styles.icons} source={require("../assets/gold.png")} />{" "}
        per miner:{" "}
        {1 + props.pickaxes.getLevel() * values.PICKAXE_MINERS_INCREASE}
      </Text>
    </TouchableOpacity>
  );
}

export default Pickaxes;
