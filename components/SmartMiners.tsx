import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import Values from "../values/Values";
import { buyOne } from "../functions/Buy";
import { simplifyNumbers } from "../functions/SimplifyNumber";

function SmartMiners({
  smartMiners,
  bones,
  calcGPS,
}: {
  smartMiners: Upgrade;
  bones: React.RefObject<number>;
  calcGPS: CallableFunction;
}) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      onPress={() => {
        if (buyOne(bones, smartMiners)) calcGPS();
      }}
    >
      <Text>Smarter Miners: {smartMiners.getLevel()}</Text>
      <Text style={styles.MinersText}>
        Cost: {simplifyNumbers(smartMiners.getCurrentCost())}{" "}
        <Image
          style={styles.icons}
          source={require("../assets/bone_outline.png")}
        />
      </Text>
      <Text style={styles.MinersText}>
        Bonus production per miner:{" "}
        {smartMiners.getLevel() * Values.SMART_MINER_BONUS * 100}%
      </Text>
    </TouchableOpacity>
  );
}

export default SmartMiners;
