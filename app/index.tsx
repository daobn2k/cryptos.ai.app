import { ThemedText } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants/Colors";
import { useCustomAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { useProfile } from "@/src/hooks/useProfile";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
WebBrowser.maybeCompleteAuthSession();

const screenWidth = Dimensions.get("window").width;
const discovery = {
  authorizationEndpoint: "https://twitter.com/i/oauth2/authorize",
};

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setAsyncStorage } = useCustomAsyncStorage();
  const { onGetInfo } = useProfile();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "bnFFRDZkejFtOEd4clR1SlV5M1A6MTpjaQ",
      redirectUri: makeRedirectUri(),
      usePKCE: true,
      scopes: ["tweet.read", "offline.access", "users.read"],
      codeChallenge: "challenge",
      responseType: "code",
      state: "state",
    },
    discovery
  );
  const auth = async (code: string) => {
    setLoading(true);
    try {
      // const res = await serviceAuthLogin({ code });
      // "res.data.access_token"
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNmU3MGVhNy1hNGI1LTRhMzUtOTZkNC0yNTI4Mzg3ODdhYzgiLCJpYXQiOjE3MTgyNjQ1MTksImV4cCI6MTcxODg2OTMxOX0.T--U7ZDvu26vfvWV2dl7-q5IsmbJBgdpgiGY8bgPDhY";
      if (accessToken) {
        await setAsyncStorage("accessToken", accessToken);
        const profile = await onGetInfo(accessToken);
        if (profile?.status_code === 200) {
          router.push(`/trending`);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error, "error");
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      // console.log(response.params, "response.params");
      auth(code);
    }
  }, [response]);

  const buttonPrimary = useThemeColor(
    {
      light: Colors.light["button-primary"],
      dark: Colors.dark["button-primary"],
    },
    "button-primary"
  );
  const background = useThemeColor(
    {
      light: Colors.light["background"],
      dark: Colors.dark["background"],
    },
    "background"
  );
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.top}>
        <Image
          source={require("../assets/images/sign-in.gif")}
          style={styles.gif}
        />
      </View>
      <View style={styles.main}>
        <Image
          source={require("../assets/home/home-page-logo.png")}
          style={styles.logo}
        />
        <View style={styles.viewText}>
          <ThemedText type="font-body-md" color="text-tertiary">
            Stay up to date with the latest
          </ThemedText>
          <ThemedText type="font-body-md" color="text-tertiary">
            Crypto news
          </ThemedText>
        </View>
        <TouchableOpacity
          onPress={() => promptAsync()}
          style={[styles.button, { backgroundColor: buttonPrimary }]}
        >
          {!loading ? (
            <>
              <Image
                source={require("../assets/images/ic-x.png")}
                style={styles.icX}
              />
              <ThemedText type="font-body-md" color="text-inverse">
                Continue with X
              </ThemedText>
            </>
          ) : (
            <ActivityIndicator size={24} color={Colors.dark["text-inverse"]} />
          )}
        </TouchableOpacity>
        <View>
          <ThemedText type="font-11-500" color="text-tertiary">
            Powered by GM.AI
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
  },
  container: {
    backgroundColor: "#000",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    paddingTop: 16,
    flex: 1,
  },
  main: {
    alignItems: "center",
  },
  viewText: {
    alignItems: "center",
  },
  icX: {
    width: 24,
    height: 24,
    objectFit: "cover",
  },
  logo: {
    width: 135,
    height: 96,
    objectFit: "cover",
    marginBottom: 8,
  },
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
  gif: {},
});
