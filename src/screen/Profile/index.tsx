import { ViewAction } from "@/src/components/CardDiscover";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Colors } from "@/src/constants/Colors";
import { useCustomAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { useLanguage } from "@/src/hooks/useLanguage";
import { useProfile } from "@/src/hooks/useProfile";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile() {
  const router = useRouter();
  const { profile } = useProfile();
  const { language, onChangeLanguage } = useLanguage();
  const { removeAsyncStorage } = useCustomAsyncStorage();

  const bgTouch = useThemeColor(
    { light: Colors.light["white-a10"], dark: Colors.dark["white-a10"] },
    "white-a10"
  );

  const onPressChangeLanguage = () => {};

  const onShowThead = () => {
    router.push({
      pathname: "threads/list",
    });
  };

  const onLogout = async () => {
    await removeAsyncStorage("accessToken");
    router.push("/");
  };
  return (
    <ThemedView style={styles.container}>
      <View style={styles.top}>
        <Image
          source={
            profile?.twitter_user?.metadata?.image_url
              ? { uri: profile?.twitter_user?.metadata?.image_url }
              : require("@assets/profile/profile.png")
          }
          style={{ width: 64, height: 64, borderRadius: 999 }}
        />
        <View style={styles.profile}>
          <ThemedText type="font-18-500" color="text-primary">
            {profile?.twitter_user?.name}
          </ThemedText>
          <ThemedText color="text-tertiary" type="font-body-sm">
            {profile?.twitter_user?.username}
          </ThemedText>
        </View>
      </View>
      <View style={styles.art}>
        <View style={{ flex: 1 }}>
          <ThemedText type="font-18-500" color="text-primary">
            Cryptos.ai
          </ThemedText>
          <ThemedText
            color="a-70"
            type="font-body-sm"
            style={{ marginTop: 8, marginBottom: 16 }}
          >
            Unlock exclusive contents and dive in world of crypto.
          </ThemedText>
          <TouchableOpacity style={styles.touch}>
            <Image
              source={require("@assets/profile/ic-leading-icon.png")}
              style={{ width: 20, height: 20, borderRadius: 999 }}
            />
            <ThemedText type="font-13-500" color="text-inverse">
              Go Pro
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 8 }}>
          <Image
            source={require("@assets/profile/logo-profile.png")}
            style={{ width: 121, height: 121, objectFit: "cover" }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.thread} onPress={() => onShowThead()}>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Image
            source={require("@assets/profile/ic-book-2-line.png")}
            style={{ width: 24, height: 24 }}
          />
          <ThemedText type="font-16-500" color="text-primary">
            Threads
          </ThemedText>
        </View>
        <View style={styles.viewThread}>
          <Image
            source={require("@assets/profile/right-line.png")}
            style={{ width: 24, height: 24 }}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.thread}>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Image
            source={require("@assets/profile/ic-translate.png")}
            style={{ width: 24, height: 24 }}
          />
          <ThemedText type="font-16-500" color="text-primary">
            Language
          </ThemedText>
        </View>
        <View style={[styles.actions, { backgroundColor: bgTouch }]}>
          <TouchableOpacity
            style={[
              styles.touchTranslate,
              {
                backgroundColor:
                  language === "en"
                    ? Colors.dark["button-primary"]
                    : "transparent",
              },
            ]}
            onPress={() => onChangeLanguage("en")}
          >
            <ThemedText
              type="font-13-500"
              color={language === "en" ? "text-inverse" : "text-tertiary"}
            >
              English
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.touchTranslate,
              {
                backgroundColor:
                  language === "cn"
                    ? Colors.dark["button-primary"]
                    : "transparent",
              },
            ]}
            onPress={() => onChangeLanguage("cn")}
          >
            <ThemedText
              type="font-13-500"
              color={language === "cn" ? "text-inverse" : "text-tertiary"}
            >
              英语
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <ThemedText type="font-body-sm" color="text-tertiary">
            Helps
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <ThemedText type="font-body-sm" color="text-tertiary">
            Privacy policy
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <ThemedText type="font-body-sm" color="text-tertiary">
            Term of service
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 16,
            paddingRight: 16,
          }}
          onPress={() => onLogout()}
        >
          <ThemedText type="font-body-sm" color="text-danger">
            Log out
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flexDirection: "row",
    paddingBottom: 8,
    paddingTop: 8,
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  profile: {
    gap: 2,
  },
  art: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.dark["border-1"],
    backgroundColor: Colors.dark["background-02"],
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    overflow: "hidden",
    gap: 14,
  },
  touch: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark["bg-button-primary"],
    borderRadius: 999,
    width: 96,
    height: 32,
  },
  thread: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    gap: 24,
    borderWidth: 1,
    borderColor: Colors.dark["border-1"],
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  viewThread: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 9999,
    position: "relative",
    backgroundColor: Colors.dark["white-a10"],
  },
  touchTranslate: {
    borderRadius: 9999,
    width: 80,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
