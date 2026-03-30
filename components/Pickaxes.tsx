import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import values from "../values/Values";
import { buyOne } from "../functions/Buy";
import { simplifyNumbers } from "../functions/SimplifyNumber";

function Pickaxes({
  pickaxes,
  gold,
  calcGPS,
}: {
  pickaxes: Upgrade;
  gold: React.RefObject<number>;
  calcGPS: CallableFunction;
}) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      onPress={() => {
        if (buyOne(gold, pickaxes)) calcGPS();
      }}
    >
      <Text>Pickaxe Level: {pickaxes.getLevel()}</Text>
      <Text style={styles.MinersText}>
        Cost: {simplifyNumbers(pickaxes.getCurrentCost())}{" "}
        <Image
          style={styles.icons}
          source={require("../assets/gold_outline.png")}
        />
      </Text>
      <Text style={styles.MinersText}>
        Base{" "}
        <Image
          style={styles.icons}
          source={require("../assets/gold_outline.png")}
        />{" "}
        per miner: {1 + pickaxes.getLevel() * values.PICKAXE_MINERS_INCREASE}
      </Text>
    </TouchableOpacity>
  );
}

export default Pickaxes;
