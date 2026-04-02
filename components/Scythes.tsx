import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import values from "../values/Values";
import { simplifyNumbers } from "../functions/SimplifyNumber";

function Scythes({
  scythes,
  gold,
  calcGPS,
}: {
  scythes: Upgrade;
  gold: React.RefObject<number>;
  calcGPS: CallableFunction;
}) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      onPress={() => {
        if (scythes.buy(gold)) calcGPS();
      }}
    >
      <Text style={styles.UpgradeNameText}>
        Scythe Level: {scythes.getLevel()}
      </Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(scythes.getCurrentCost())}{" "}
        <Image
          style={styles.icons}
          source={require("../assets/gold_outline.png")}
        />
      </Text>
      <Text style={styles.UpgradeText}>
        Base{" "}
        <Image
          style={styles.icons}
          source={require("../assets/gold_outline.png")}
        />{" "}
        per farmer: {1 + scythes.getLevel() * values.SCYTHE_FARMERS_INCREASE}
      </Text>
    </TouchableOpacity>
  );
}

export default Scythes;
