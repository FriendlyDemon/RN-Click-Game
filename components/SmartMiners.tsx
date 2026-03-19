import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import { Upgrade } from "../classes/Upgrades";
import Values from "../values/Values";

function SmartMiners(props: { smartMiners: Upgrade; buy: CallableFunction }) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      onPress={() => {
        props.buy();
      }}
    >
      <Text>Smarter Miners: {props.smartMiners.getLevel()}</Text>
      <Text style={styles.MinersText}>
        Cost: {props.smartMiners.getCurrentCost()}{" "}
        <Image style={styles.icons} source={require("../assets/bone.png")} />
      </Text>
      <Text style={styles.MinersText}>
        Bonus production per miner:{" "}
        {props.smartMiners.getLevel() * Values.SMART_MINER_BONUS * 100}%
      </Text>
    </TouchableOpacity>
  );
}

export default SmartMiners;
