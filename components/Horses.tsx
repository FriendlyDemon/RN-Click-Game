import { Image, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import values from "../values/Values";
import { simplifyNumbers } from "../functions/SimplifyNumber";
import { images } from "../assets/images";

function Horses({
  horses,
  calcGPS,
}: {
  horses: Upgrade;
  calcGPS: CallableFunction;
}) {
  const worth = useMemo<number>(() =>  horses.getLevel() * values.HORSE_BONUS * 100, [horses.getLevel()]);

  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      activeOpacity={0.7}
      onPress={() => {
        if (horses.buy()) calcGPS();
      }}
    >
      <Text style={styles.UpgradeNameText}>Horses: {horses.getLevel()}</Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(horses.getCurrentCost())}{" "}
        <Image style={styles.icons} source={images.bone_outline} />
      </Text>
      <Text style={styles.UpgradeText}>
        Bonus production per farmer: {worth}%
      </Text>
    </TouchableOpacity>
  );
}

export default Horses;
