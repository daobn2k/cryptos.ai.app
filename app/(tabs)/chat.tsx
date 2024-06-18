import { ThemedText } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants/Colors";
import { useState } from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const screenWidth = Dimensions.get("window").width;

export default function Chat() {
  const insets = useSafeAreaInsets();
  const onPress = () => {};
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.dark["background-01"],
        justifyContent: "space-between",
        paddingBottom: insets.bottom + 56,
      }}
    >
      <View style={{ justifyContent: "center" }}>
        <View
          style={{
            paddingLeft: 32,
            paddingRight: 32,
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <Image
            source={require("@assets/home/home-page-logo.png")}
            style={{
              width: 90,
              height: 64,
            }}
          />
          <ThemedText
            type="font-heading-xl"
            color="text-primary"
            style={{ textAlign: "center" }}
          >
            Explore the world of Blockchain
          </ThemedText>
        </View>
        <ScrollView
          style={{
            flexDirection: "row",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              marginBottom: 8,
              marginLeft: -80,
            }}
          >
            <Question text="What is Bitcoin?" />
            <Question text="What is Ethereum?" />
            <Question text="How does blockchain work?" />
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              marginBottom: 8,
              marginLeft: -80,
            }}
          >
            <Question text="What are altcoins?" />
            <Question text="How to buy crypto?" />
            <Question text="How are new cryptocurrencies created?" />
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              marginLeft: -80,
            }}
          >
            <Question text="What is a crypto wallet?" />
            <Question text="What are NFTs?" />
            <Question text="What is a smart contract?" />
          </View>
        </ScrollView>
      </View>

      <View style={{ paddingLeft: 16, paddingRight: 16, position: "relative" }}>
        <TouchViewThread placeholder="Ask anything" onPress={onPress} />
      </View>
    </View>
  );
}

export const TouchViewThread = ({
  placeholder,
  onPress,
}: {
  placeholder: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: Colors.dark["background-03"],
        borderRadius: 999,
        height: 48,
        alignItems: "center",
      }}
    >
      <ThemedText type="font-16-400" color="text-secondary">
        {placeholder}
      </ThemedText>
      <Image
        source={require("@assets/profile/ic-send-meassge.png")}
        style={{
          width: 24,
          height: 24,
        }}
      />
    </TouchableOpacity>
  );
};

const Question = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: Colors.dark["white-a10"],
        borderRadius: 8,
      }}
    >
      <ThemedText type="font-body-sm" color="text-tertiary">
        {text}
      </ThemedText>
    </View>
  );
};
