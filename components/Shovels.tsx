import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import { simplifyNumbers } from "../functions/SimplifyNumber";
import { images } from "../assets/images";

function Shovels({
  shovel,
  calcClick,
}: {
  shovel: Upgrade;
  calcClick: CallableFunction;
}) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      activeOpacity={0.7}
      onPress={() => {
        if (shovel.buy()) calcClick();
      }}
    >
      <Text style={styles.UpgradeNameText}>
        Shovel Level: {shovel.getLevel()}
      </Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(shovel.getCurrentCost())}{" "}
        <Image style={styles.icons} source={images.gold_outline} />
      </Text>
      <Text style={styles.UpgradeText}>
        <Image style={styles.icons} source={images.bone_outline} /> per Click:{" "}
        {shovel.getLevel() + 1}
      </Text>
    </TouchableOpacity>
  );
}

export default Shovels;
