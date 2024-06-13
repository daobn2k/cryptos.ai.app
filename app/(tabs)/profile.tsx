import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Colors } from "@/src/constants/Colors";
import Profile from "@/src/screen/Profile";

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      setting={{
        style: {
          padding: 16,
        },
      }}
    >
      <Profile />
    </ParallaxScrollView>
  );
}
