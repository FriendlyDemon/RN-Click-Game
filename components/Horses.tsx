import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import values from "../values/Values";
import { simplifyNumbers } from "../functions/SimplifyNumber";

function Horses({
  horses,
  bones,
  calcGPS,
}: {
  horses: Upgrade;
  bones: React.RefObject<number>;
  calcGPS: CallableFunction;
}) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      onPress={() => {
        if (horses.buy(bones)) calcGPS();
      }}
    >
      <Text style={styles.UpgradeNameText}>Horses: {horses.getLevel()}</Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(horses.getCurrentCost())}{" "}
        <Image
          style={styles.icons}
          source={require("../assets/bone_outline.png")}
        />
      </Text>
      <Text style={styles.UpgradeText}>
        Bonus production per farmer:{" "}
        {horses.getLevel() * values.HORSE_BONUS * 100}%
      </Text>
    </TouchableOpacity>
  );
}

export default Horses;
