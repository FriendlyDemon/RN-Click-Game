import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import values from "../values/Values";
import { simplifyNumbers } from "../functions/SimplifyNumber";
import { images } from "../assets/images";

function Scythes({
  scythes,
  calcGPS,
}: {
  scythes: Upgrade;
  calcGPS: CallableFunction;
}) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      activeOpacity={0.7}
      onPress={() => {
        if (scythes.buy()) calcGPS();
      }}
    >
      <Text style={styles.UpgradeNameText}>
        Scythe Level: {scythes.getLevel()}
      </Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(scythes.getCurrentCost())}{" "}
        <Image style={styles.icons} source={images.gold_outline} />
      </Text>
      <Text style={styles.UpgradeText}>
        Base <Image style={styles.icons} source={images.gold_outline} /> per
        farmer: {1 + scythes.getLevel() * values.SCYTHE_FARMERS_INCREASE}
      </Text>
    </TouchableOpacity>
  );
}

export default Scythes;
