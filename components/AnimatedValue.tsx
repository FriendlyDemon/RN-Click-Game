import React, { useEffect, useState } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import {
  useSharedValue,
  useDerivedValue,
  useAnimatedReaction,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { simplifyNumbers } from "../functions/SimplifyNumber";
import { scheduleOnRN } from "react-native-worklets";

export default function SmoothNumber({
  value,
  instant = false,
  style,
}: {
  value: number;
  instant?: boolean;
  style?: StyleProp<TextStyle>;
}) {
  const target = useSharedValue(value);
  const display = useSharedValue(value);
  const instantSV = useSharedValue(instant);
  const [displayText, setDisplayText] = useState(simplifyNumbers(value));

  useEffect(() => {
    target.value = value;
  }, [value]);

  useEffect(() => {
    instantSV.value = instant;
  }, [instant]);

  useDerivedValue(() => {
    const diff = Math.abs(target.value - display.value);

    if (instantSV.value) {
      display.value = target.value;
      return;
    }

    const duration =
      diff < 10 ? 150 : diff < 1000 ? 300 : diff < 100000 ? 400 : 500;

    display.value = withTiming(target.value, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  });

  useAnimatedReaction(
    () => display.value,
    (currentValue) => {
      scheduleOnRN(setDisplayText, simplifyNumbers(currentValue));
    },
  );

  return <Text style={style}>{displayText}</Text>;
}
