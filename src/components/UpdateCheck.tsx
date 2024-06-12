import React, { useEffect, useState } from "react";
import * as Updates from "expo-updates";
import { ActivityIndicator, Button, Image, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { ThemedText } from "./ThemedText";

const UpdateCheck = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const checkForUpdates = async () => {
    setIsChecking(true);
    try {
      setIsUpdating(true);
      const isUpdateAvailable = await Updates.checkForUpdateAsync();
      if (isUpdateAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsChecking(false);
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    checkForUpdates();
  }, []);

  return (
    <>
      {(isChecking || isUpdating) && (
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
            <ActivityIndicator size={24} color={Colors.dark["white-a80"]} />

            <ThemedText color="text-primary">Updating ...</ThemedText>
          </View>
        </View>
      )}
    </>
  );
  return <></>;
};

export default UpdateCheck;
