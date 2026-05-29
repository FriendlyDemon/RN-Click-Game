import { Image, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import values from "../values/Values";
import { simplifyNumbers } from "../functions/SimplifyNumber";
import { images } from "../assets/images";

function Horses({
  horses,
  calcGPS,
  ammount,
}: {
  horses: Upgrade;
  calcGPS: CallableFunction;
  ammount: [number, number];
}) {
  const worth = useMemo<number>(
    () => horses.getLevel() * values.HORSE_BONUS * 100,
    [horses.getLevel()],
  );

  return (
    <TouchableOpacity
      style={[styles.upgradeBox,{opacity:horses.canBuy(ammount[1])?1:0.5}]}
      activeOpacity={0.7}
      onPress={() => {
        if (horses.buy(ammount)) calcGPS();
      }}
    >
      <Text style={styles.UpgradeNameText}>
        Skeleton Horses: {horses.getLevel()}
        {ammount[0] > 1 ? ` + ${ammount[0]}` : null}
      </Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(ammount[1])}{" "}
        <Image style={styles.icons} source={images.bone_outline} />
      </Text>
      <Text style={styles.UpgradeText}>
        Bonus production per farmer: {worth}%
      </Text>
    </TouchableOpacity>
  );
}

export default Horses;
