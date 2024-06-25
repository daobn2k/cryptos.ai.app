import { useRequest } from "ahooks";
import { serviceShareBlog } from "../screen/Trending/serivce";
import { Blog } from "../utils/blog.utils";
import { Alert, Share } from "react-native";
import Toast from "react-native-toast-message";

export const useShare = () => {
  const { runAsync: runShare } = useRequest(serviceShareBlog, { manual: true });

  const onShare = async (
    item: Blog,
    callback?: (data: Blog, position: any) => void,
    position?: number
  ) => {
    const data: Blog = {
      ...item,
      total_shared: item.total_shared + 1,
    };
    runShare(item.id);
    callback && callback(data, position);

    try {
      const result = await Share.share({
        message: item.title + " - cryptos.ai",
        url: ``,
      });
      if (result.action === Share.sharedAction) {
        Toast.show({
          type: "notification",
          position: "bottom",
          bottomOffset: 96,
          props: { text: "You’re copied link", uuid: "Copy link" },
        });
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return { onShare };
};
