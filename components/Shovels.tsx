import { Image, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import { simplifyNumbers } from "../functions/SimplifyNumber";
import { images } from "../assets/images";

function Shovels({
  shovel,
  calcClick,
  ammount,
}: {
  shovel: Upgrade;
  calcClick: CallableFunction;
  ammount: [number, number];
}) {
  const worth = useMemo<number>(
    () => shovel.getLevel() + 1,
    [shovel.getLevel()],
  );

  return (
    <TouchableOpacity
      style={[styles.upgradeBox,{opacity:shovel.canBuy(ammount[1])?1:0.5}]}
      activeOpacity={0.7}
      onPress={() => {
        if (shovel.buy(ammount)) calcClick();
      }}
    >
      <Text style={styles.UpgradeNameText}>
        Shovel Level: {shovel.getLevel()}
        {ammount[0] > 1 ? ` + ${ammount[0]}` : null}
      </Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(ammount[1])}{" "}
        <Image style={styles.icons} source={images.gold_outline} />
      </Text>
      <Text style={styles.UpgradeText}>
        <Image style={styles.icons} source={images.bone_outline} /> per Click:{" "}
        {worth}
      </Text>
    </TouchableOpacity>
  );
}

export default Shovels;
