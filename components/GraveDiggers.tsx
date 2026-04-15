import { Image, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import { simplifyNumbers } from "../functions/SimplifyNumber";
import { images } from "../assets/images";

function GraveDiggers({
  graveDigger,
  click,
  calcBPS,
}: {
  graveDigger: Upgrade;
  click: number;
  calcBPS: CallableFunction;
}) {
  const worth = useRef<string>(
    simplifyNumbers((graveDigger.getLevel() * click) / 2),
  );
  useEffect(() => {
    worth.current = simplifyNumbers((graveDigger.getLevel() * click) / 2);
  }, [graveDigger.getLevel(), click]);
  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      activeOpacity={0.7}
      onPress={() => {
        if (graveDigger.buy()) calcBPS();
      }}
    >
      <Text style={styles.UpgradeNameText}>
        Grave Diggers: {graveDigger.getLevel()}
      </Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(graveDigger.getCurrentCost())}{" "}
        <Image style={styles.icons} source={images.gold_outline} />
      </Text>
      <Text style={styles.UpgradeText}>
        <Image style={styles.icons} source={images.bone_outline} /> :{" "}
        {worth.current}
        /s
      </Text>
    </TouchableOpacity>
  );
}

export default GraveDiggers;
