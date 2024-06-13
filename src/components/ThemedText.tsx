import { StyleSheet, Text, useColorScheme, type TextProps } from "react-native";

import { Colors } from "@/src/constants/Colors";
import { useMemo } from "react";
import { colorTypes, textTypes } from "../utils/type.utils";

export type ThemedTextProps = TextProps & {
  color?: colorTypes;
  type?: textTypes;
};

export function ThemedText({
  style,
  color = "text-primary",
  type,
  ...rest
}: ThemedTextProps) {
  const theme = useColorScheme();
  const colorText = useMemo(() => {
    if (!theme) return "";
    return Colors[theme]?.[color];
  }, [theme, color]);

  return (
    <Text
      style={[{ color: colorText }, type && styles[type], style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  "font-24-500": {
    fontSize: 24, // 1.5rem = 24px
    fontFamily: "Aspekta-Medium",
    lineHeight: 32, // 32px
  },
  "font-21-500": {
    fontSize: 21, // 1.3125rem = 21px
    fontFamily: "Aspekta-Medium",
    lineHeight: 28, // 28px
  },
  "font-21-600": {
    fontSize: 21, // 1.3125rem = 21px
    fontFamily: "Aspekta-Bold",
    lineHeight: 28, // 28px
  },
  "font-14-400": {
    fontSize: 14, // 0.875rem = 14px
    fontFamily: "Aspekta",
    lineHeight: 24, // 24px
  },
  "font-11-400": {
    fontSize: 11, // 0.6875rem = 11px
    fontFamily: "Aspekta",
    lineHeight: 12, // 12px
  },
  "font-11-500": {
    fontSize: 11, // 0.6875rem = 11px
    fontFamily: "Aspekta-Medium",
    lineHeight: 12, // 12px
  },
  "font-15-500": {
    fontSize: 15, // 0.9375rem = 15px
    fontFamily: "Aspekta-Medium",
    lineHeight: 20, // 20px
  },
  "font-15-600": {
    fontSize: 15, // 0.9375rem = 15px
    fontFamily: "Aspekta-Bold",
    lineHeight: 20, // 20px
  },
  "font-18-500": {
    fontSize: 18, // 1.125rem = 18px
    fontFamily: "Aspekta-Medium",
    lineHeight: 24, // 24px
  },
  "font-12-500": {
    fontSize: 12, // 0.75rem = 12px
    fontFamily: "Aspekta-Medium",
    lineHeight: 16, // 16px
  },
  "font-13-400": {
    fontSize: 13, // 0.8125rem = 13px
    fontFamily: "Aspekta",
    lineHeight: 20, // 20px
  },
  "font-13-500": {
    fontSize: 13, // 0.8125rem = 13px
    fontFamily: "Aspekta-Medium",
    lineHeight: 20, // 20px
  },
  "font-10-500": {
    fontSize: 10, // 0.625rem = 10px
    fontFamily: "Aspekta-Medium",
    lineHeight: 12, // 12px
  },
  "font-body-sm": {
    fontSize: 14, // 0.875rem = 14px
    fontFamily: "Aspekta",
    lineHeight: 22.4, // 160% of 14px
  },
  "font-16-500": {
    fontSize: 16, // 1rem = 16px
    fontFamily: "Aspekta-Medium",
    lineHeight: 25.6, // 160% of 16px
  },
  "font-body-md": {
    fontSize: 16, // 1rem = 16px
    fontFamily: "Aspekta",
    lineHeight: 25.6, // 160% of 16px
  },
  "font-body-lg": {
    fontSize: 18, // 1.125rem = 18px
    fontFamily: "Aspekta",
    lineHeight: 28.8, // 160% of 18px
  },
  "font-heading-xs": {
    fontSize: 12, // 0.75rem = 12px
    fontFamily: "Aspekta-Bold",
    lineHeight: 16, // 133.3% of 12px
  },
  "font-heading-sm": {
    fontSize: 16, // 1rem = 16px
    fontFamily: "Aspekta-Bold",
    lineHeight: 21.33, // 133.3% of 16px
  },
  "font-heading-md": {
    fontSize: 18, // 1.125rem = 18px
    fontFamily: "Aspekta-Bold",
    lineHeight: 24, // 133.3% of 18px
  },
  "font-heading-lg": {
    fontSize: 21, // 1.3125rem = 21px
    fontFamily: "Aspekta-Bold",
    lineHeight: 28, // 133.3% of 21px
  },
  "font-heading-xl": {
    fontSize: 24, // 1.5rem = 24px
    fontFamily: "Aspekta-Bold",
    lineHeight: 32, // 133.3% of 24px
  },
});
