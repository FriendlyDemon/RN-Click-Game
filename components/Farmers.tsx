import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import values from "../values/Values";
import { simplifyNumbers } from "../functions/SimplifyNumber";

function Farmers({
  farmers,
  scythe,
  horses,
  bones,
  calcGPS,
}: {
  farmers: Upgrade;
  scythe: Upgrade;
  horses: Upgrade;
  bones: React.RefObject<number>;
  calcGPS: CallableFunction;
}) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      onPress={() => {
        if (farmers.buy(bones)) calcGPS();
      }}
    >
      <Text style={styles.UpgradeNameText}>
        Skeleton Farmers: {farmers.getLevel()}
      </Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(farmers.getCurrentCost())}{" "}
        <Image
          style={styles.icons}
          source={require("../assets/bone_outline.png")}
        />
      </Text>
      <Text style={styles.UpgradeText}>
        <Image
          style={styles.icons}
          source={require("../assets/gold_outline.png")}
        />{" "}
        :{" "}
        {simplifyNumbers(
          farmers.getLevel() *
            (1 + scythe.getLevel() * values.SCYTHE_FARMERS_INCREASE) *
            Math.pow(
              1 + horses.getLevel() * values.HORSE_BONUS,
              farmers.getLevel(),
            ),
        )}
        /s
      </Text>
    </TouchableOpacity>
  );
}

export default Farmers;
