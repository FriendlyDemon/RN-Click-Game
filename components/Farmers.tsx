import { Image, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import values from "../values/Values";
import { simplifyNumbers } from "../functions/SimplifyNumber";
import Farmer from "../classes/Upgrades/Farmer";
import { images } from "../assets/images";

function Farmers({
  farmers,
  scythe,
  horses,
  calcGPS,
  ammount,
}: {
  farmers: Farmer;
  scythe: Upgrade;
  horses: Upgrade;
  calcGPS: CallableFunction;
  ammount: [number, number];
}) {
  const worth = useMemo<string>(() => {
    const farmerLevel = farmers.getLevel();

    const scytheBonus = 1 + scythe.getLevel() * values.SCYTHE_FARMERS_INCREASE;
    const horseBonus = 1 + horses.getLevel() * values.HORSE_BONUS;

    const result =
      farmerLevel * scytheBonus * Math.pow(horseBonus, farmerLevel);

    return simplifyNumbers(result);
  }, [farmers.getLevel(), scythe.getLevel(), horses.getLevel()]);

  return (
    <TouchableOpacity
      style={[styles.upgradeBox,{opacity:farmers.canBuy(ammount[1])?1:0.5}]}
      activeOpacity={0.7}
      onPress={() => {
        if (farmers.buy(ammount)) calcGPS();
      }}
    >
      <Text style={styles.UpgradeNameText}>
        Skeleton Farmers: {farmers.getLevel()}
        {ammount[0] > 1 ? ` + ${ammount[0]}` : null}
      </Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(ammount[1])}{" "}
        <Image style={styles.icons} source={images.bone_outline} />
      </Text>
      <Text style={styles.UpgradeText}>
        <Image style={styles.icons} source={images.gold_outline} /> : {worth}
        /s
      </Text>
    </TouchableOpacity>
  );
}

export default Farmers;
