import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import { buyOne } from "../functions/Buy";
import { simplifyNumbers } from "../functions/SimplifyNumber";

function GraveDiggers({
  graveDigger,
  click,
  gold,
  calcBPS,
}: {
  graveDigger: Upgrade;
  click: number;
  gold: React.RefObject<number>;
  calcBPS: CallableFunction;
}) {
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      onPress={() => {
        if (buyOne(gold, graveDigger)) calcBPS();
      }}
    >
      <Text>Grave Diggers: {graveDigger.getLevel()}</Text>
      <Text style={styles.MinersText}>
        Cost: {simplifyNumbers(graveDigger.getCurrentCost())}{" "}
        <Image
          style={styles.icons}
          source={require("../assets/gold_outline.png")}
        />
      </Text>
      <Text style={styles.MinersText}>
        <Image
          style={styles.icons}
          source={require("../assets/bone_outline.png")}
        />{" "}
        : {simplifyNumbers((graveDigger.getLevel() * click) / 2)}
        /s
      </Text>
    </TouchableOpacity>
  );
}

export default GraveDiggers;
