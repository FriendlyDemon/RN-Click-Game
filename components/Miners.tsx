import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import { Upgrade } from "../classes/Upgrades";
import values from "../values/Values";

function Miners(props: {
  miners: Upgrade;
  pickaxe: Upgrade;
  smartMiners: Upgrade;
  buy: CallableFunction;
}) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      onPress={() => {
        props.buy();
      }}
    >
      <Text>Skeleton Miners: {props.miners.getLevel()}</Text>
      <Text style={styles.MinersText}>
        Cost: {props.miners.getCurrentCost()}{" "}
        <Image style={styles.icons} source={require("../assets/bone.png")} />
      </Text>
      <Text style={styles.MinersText}>
        <Image style={styles.icons} source={require("../assets/gold.png")} /> :{" "}
        {(props.miners.getLevel() *
          (1 + props.pickaxe.getLevel() * values.PICKAXE_MINERS_INCREASE) *
          Math.pow(
            1 + props.smartMiners.getLevel() * values.SMART_MINER_BONUS,
            props.miners.getLevel(),
          )).toFixed(2)}
        /s
      </Text>
    </TouchableOpacity>
  );
}

export default Miners;
