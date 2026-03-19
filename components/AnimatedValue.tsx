import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function SmoothNumber({ value }: { value: number }) {
  const target = useSharedValue(value);
  const display = useSharedValue(value);

  // Update target when real value changes
  useEffect(() => {
    target.value = value;
  }, [value]);

  // Animate toward target (runs on UI thread)
  useDerivedValue(() => {
    display.value = withTiming(target.value, {
      duration: Math.min(500, Math.abs(target.value - display.value) * 2),
      easing: Easing.out(Easing.cubic),
    });
  });

  return (
    <Animated.Text>
      {display.value > 1e6
        ? display.value.toExponential(3)
        : Math.floor(display.value)}
    </Animated.Text>
  );
}
