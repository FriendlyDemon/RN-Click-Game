import { Image, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import { simplifyNumbers } from "../functions/SimplifyNumber";
import { images } from "../assets/images";

function GraveDiggers({
  graveDigger,
  click,
  calcBPS,
  ammount,
}: {
  graveDigger: Upgrade;
  click: number;
  calcBPS: CallableFunction;
  ammount: [number, number];
}) {
  const worth = useMemo<string>(
    () => simplifyNumbers((graveDigger.getLevel() * click) / 2),
    [graveDigger.getLevel(), click],
  );

  return (
    <TouchableOpacity
      style={[styles.upgradeBox,{opacity:graveDigger.canBuy(ammount[1])?1:0.5}]}
      activeOpacity={0.7}
      onPress={() => {
        if (graveDigger.buy(ammount)) calcBPS();
      }}
    >
      <Text style={styles.UpgradeNameText}>
        Grave Diggers: {graveDigger.getLevel()}
        {ammount[0] > 1 ? ` + ${ammount[0]}` : null}
      </Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(ammount[1])}{" "}
        <Image style={styles.icons} source={images.gold_outline} />
      </Text>
      <Text style={styles.UpgradeText}>
        <Image style={styles.icons} source={images.bone_outline} /> : {worth}
        /s
      </Text>
    </TouchableOpacity>
  );
}

export default GraveDiggers;
