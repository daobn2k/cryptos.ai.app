import * as Updates from "expo-updates";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../constants/Colors";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
const screenWidth = Dimensions.get("window").width;

const UpdateCheck = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  const updateVersion = async () => {
    try {
      setIsUpdating(true);
      await Updates.fetchUpdateAsync();
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (isUpdatePending) {
      // Update has successfully downloaded; apply it now
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  const buttonPrimary = useThemeColor(
    {
      light: Colors.light["button-primary"],
      dark: Colors.dark["button-primary"],
    },
    "button-primary"
  );
  const showDownloadButton = isUpdateAvailable;
  return (
    <>
      {showDownloadButton && (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: "black",
          }}
        >
          <View
            style={{
              padding: 4,
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Image
              source={require("@assets/home/home-page-logo.png")}
              style={{ width: 135, height: 96 }}
            />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: buttonPrimary }]}
              onPress={() => updateVersion()}
            >
              <ThemedText type="font-body-md" color="text-inverse">
                Test update new version now
              </ThemedText>
              {isUpdating && (
                <ActivityIndicator
                  size={24}
                  color={Colors.dark["text-inverse"]}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default UpdateCheck;

const styles = StyleSheet.create({
  button: {
    width: screenWidth - 32,
    flexDirection: "row",
    gap: 8,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    marginTop: 32,
  },
});
