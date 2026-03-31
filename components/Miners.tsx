import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import values from "../values/Values";
import { simplifyNumbers } from "../functions/SimplifyNumber";

function Miners({
  miners,
  pickaxe,
  smartMiners,
  bones,
  calcGPS,
}: {
  miners: Upgrade;
  pickaxe: Upgrade;
  smartMiners: Upgrade;
  bones: React.RefObject<number>;
  calcGPS: CallableFunction;
}) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      onPress={() => {
        if (miners.buy(bones)) calcGPS();
      }}
    >
      <Text>Skeleton Miners: {miners.getLevel()}</Text>
      <Text style={styles.MinersText}>
        Cost: {simplifyNumbers(miners.getCurrentCost())}{" "}
        <Image
          style={styles.icons}
          source={require("../assets/bone_outline.png")}
        />
      </Text>
      <Text style={styles.MinersText}>
        <Image
          style={styles.icons}
          source={require("../assets/gold_outline.png")}
        />{" "}
        :{" "}
        {simplifyNumbers(
          miners.getLevel() *
            (1 + pickaxe.getLevel() * values.PICKAXE_MINERS_INCREASE) *
            Math.pow(
              1 + smartMiners.getLevel() * values.SMART_MINER_BONUS,
              miners.getLevel(),
            ),
        )}
        /s
      </Text>
    </TouchableOpacity>
  );
}

export default Miners;
