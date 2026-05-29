import { Image, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { styles } from "../styles/style";
import Upgrade from "../classes/Upgrade";
import values from "../values/Values";
import { simplifyNumbers } from "../functions/SimplifyNumber";
import { images } from "../assets/images";

function Scythes({
  scythes,
  calcGPS,
  ammount,
}: {
  scythes: Upgrade;
  calcGPS: CallableFunction;
  ammount: [number, number];
}) {
  const worth = useMemo<number>(
    () => 1 + scythes.getLevel() * values.SCYTHE_FARMERS_INCREASE,
    [scythes.getLevel()],
  );

  return (
    <TouchableOpacity
      style={[styles.upgradeBox,{opacity:scythes.canBuy(ammount[1])?1:0.5}]}
      activeOpacity={0.7}
      onPress={() => {
        if (scythes.buy(ammount)) calcGPS();
      }}
    >
      <Text style={styles.UpgradeNameText}>
        Scythe Level: {scythes.getLevel()}
        {ammount[0] > 1 ? ` + ${ammount[0]}` : null}
      </Text>
      <Text style={styles.UpgradeText}>
        Cost: {simplifyNumbers(ammount[1])}{" "}
        <Image style={styles.icons} source={images.gold_outline} />
      </Text>
      <Text style={styles.UpgradeText}>
        Base <Image style={styles.icons} source={images.gold_outline} /> per
        farmer: {worth}
      </Text>
    </TouchableOpacity>
  );
}

export default Scythes;
