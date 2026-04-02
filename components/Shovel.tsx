import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import { simplifyNumbers } from "../functions/SimplifyNumber";

function Shovel({
  shovel,
  gold,
  calcClick,
}: {
  shovel: Upgrade;
  gold: React.RefObject<number>;
  calcClick: CallableFunction;
}) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      onPress={() => {
        if (shovel.buy(gold)) calcClick();
      }}
    >
      <Text style={styles.UpgradeNameText}>
        Shovel Level: {shovel.getLevel()}
      </Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(shovel.getCurrentCost())}{" "}
        <Image
          style={styles.icons}
          source={require("../assets/gold_outline.png")}
        />
      </Text>
      <Text style={styles.UpgradeText}>
        <Image
          style={styles.icons}
          source={require("../assets/bone_outline.png")}
        />{" "}
        per Click: {shovel.getLevel() + 1}
      </Text>
    </TouchableOpacity>
  );
}

export default Shovel;
