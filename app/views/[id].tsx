import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { ViewBlog } from "@/src/screen/ViewBlog";
import { useLocalSearchParams } from "expo-router";

const ViewPage = () => {
  const { id } = useLocalSearchParams();
  return <ViewBlog slug={id} />;
};

export default ViewPage;
