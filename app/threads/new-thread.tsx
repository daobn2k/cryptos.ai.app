import { NewThread } from "@/src/screen/NewThread";
import { useLocalSearchParams } from "expo-router";

const NewThreadPage = () => {
  const params = useLocalSearchParams();

  return <NewThread params={params} />;
};

export default NewThreadPage;
