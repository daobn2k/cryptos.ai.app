import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNewBlogs } from "../hooks/useNewBlogs";

const ViewUnread = ({ handleRefresh }: { handleRefresh: () => void }) => {
  const { countUnS, seenNews } = useNewBlogs();
  if (!countUnS) return <></>;
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 999,
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        right: 0,
        top: 8,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={() => seenNews(handleRefresh)}
        style={{
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16,
          paddingRight: 16,
          gap: 8,
          flexDirection: "row",
          backgroundColor: Colors.dark["text-link"],
          borderRadius: 999,
        }}
      >
        <Image
          source={require("@assets/images/arrow-up-line.png")}
          width={16}
          height={16}
        />
        <ThemedText type="font-12-500" color="text-inverse">
          +{countUnS} New Posts
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default ViewUnread;
