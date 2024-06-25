import { ThemedText, textStyles } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants/Colors";
import { useCustomAsyncStorage } from "@/src/hooks/useAsyncStorage";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export const stylesFocus = {
  borderRadius: 999,
  height: 48,
  marginLeft: 16,
  marginRight: 16,
  paddingLeft: 16,
  paddingRight: 16,
};
export default function Chat() {
  const { getAsyncStorage } = useCustomAsyncStorage();
  const router = useRouter();
  const [question, setQuestion] = useState<string>("");
  const insets = useSafeAreaInsets();
  const [showInput, setShowInput] = useState<boolean>(false);

  const onSendMessage = async () => {
    const token = await getAsyncStorage("accessToken");
    if (!question || !token) return;
    setQuestion("");
    setShowInput(false);
    router.push({
      pathname: "/threads/new-thread",
      params: {
        question,
      },
    });
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.dark["background-01"],
          justifyContent: "space-between",
          paddingBottom: insets.bottom + Constants.statusBarHeight,
        }}
      >
        <View
          style={{ justifyContent: "center", alignContent: "center", flex: 1 }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              setShowInput(false);
            }}
          >
            <View
              style={{
                paddingLeft: 32,
                paddingRight: 32,
                alignItems: "center",
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
            {/* <ScrollView
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
        </ScrollView> */}
          </TouchableWithoutFeedback>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          keyboardVerticalOffset={
            Platform.OS === "ios" ? 16 + Constants.statusBarHeight : 0
          }
        >
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                backgroundColor: Colors.dark["background-02"],
              },
              !showInput
                ? stylesFocus
                : {
                    padding: 16,
                  },
            ]}
          >
            <TextInput
              onFocus={() => setShowInput(true)}
              multiline
              numberOfLines={3}
              style={{
                ...textStyles["font-16-400"],
                color: Colors.dark["text-primary"],
                padding: 0,
                flex: 1,
              }}
              placeholder="Ask follow-up..."
              selectionColor={Colors.dark["text-link"]}
              placeholderTextColor={Colors.dark["text-secondary"]}
              onChangeText={(text) => setQuestion(text)}
              maxLength={100}
              value={question}
            />
            <TouchableOpacity
              onPress={(event) => {
                onSendMessage();
                event.preventDefault();
                event.stopPropagation();
              }}
              style={{ padding: 4 }}
            >
              <Image
                source={
                  question
                    ? require("@assets/view-blog/ic-send-fill.png")
                    : require("@assets/profile/ic-send-meassge.png")
                }
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
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
