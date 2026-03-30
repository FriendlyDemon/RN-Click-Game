import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { simplifyNumbers } from "../functions/SimplifyNumber";

export default function SmoothNumber({ value }: { value: number }) {
  const target = useSharedValue(value);
  const display = useSharedValue(value);

  useEffect(() => {
    target.value = value;
  }, [value]);

  useDerivedValue(() => {
    display.value = withTiming(target.value, {
      duration: Math.min(500, Math.abs(target.value - display.value) * 2),
      easing: Easing.out(Easing.cubic),
    });
  });

  return <Animated.Text>{simplifyNumbers(display.value)}</Animated.Text>;
}
