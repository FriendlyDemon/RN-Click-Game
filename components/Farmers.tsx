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
  warriors,
}: {
  farmers: Farmer;
  scythe: Upgrade;
  horses: Upgrade;
  calcGPS: CallableFunction;
  warriors: React.RefObject<number>;
}) {
  const worth = useMemo<string>(() => {
    const farmerLevel = farmers.getLevel();
    const availableFarmers = farmerLevel - warriors.current;

    const scytheBonus = 1 + scythe.getLevel() * values.SCYTHE_FARMERS_INCREASE;
    const horseBonus = 1 + horses.getLevel() * values.HORSE_BONUS;

    const result =
      availableFarmers * scytheBonus * Math.pow(horseBonus, farmerLevel);

    return simplifyNumbers(result);
  }, [farmers.getLevel(), scythe.getLevel(), horses.getLevel(),warriors.current]);

  return (
    <TouchableOpacity
      style={styles.upgradeBox}
      activeOpacity={0.7}
      onPress={() => {
        if (farmers.buy()) calcGPS();
      }}
    >
      <Text style={styles.UpgradeNameText}>
        Skeleton Farmers: {farmers.getLevel()}
      </Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(farmers.getCurrentCost())}{" "}
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
