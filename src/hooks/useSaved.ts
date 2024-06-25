import { useRequest } from "ahooks";
import { Blog } from "../utils/blog.utils";
import { deleteBlogSaved, updateBlogSaved } from "../screen/Trending/serivce";
import Toast from "react-native-toast-message";

export const useSaved = () => {
  const { runAsync } = useRequest(updateBlogSaved, { manual: true });
  const { runAsync: deleteSaved } = useRequest(deleteBlogSaved, {
    manual: true,
  });

  const onClickSaved = async (
    item: Blog,
    callback?: (data: Blog, position: any) => void,
    position?: number
  ) => {
    if (!item) {
      return;
    }

    if (item.is_saved) {
      Toast.show({
        type: "notification",
        position: "bottom",
        bottomOffset: 96,
        props: { text: "You’re unsaved thread", uuid: "Unsaved" },
      });
      const data: Blog = {
        ...item,
        is_saved: false,
        total_saved: item.total_saved - 1,
      };
      callback && callback(data, position);
      await deleteSaved(item.id);
    } else {
      Toast.show({
        type: "notification",
        position: "bottom",
        bottomOffset: 96,
        props: { text: "You’re saved thread", uuid: "Saved" },
      });
      const data: Blog = {
        ...item,
        is_saved: true,
        total_saved: item.total_saved + 1,
      };
      callback && callback(data, position);
      await runAsync(item.id);
    }
  };

  return { onClickSaved };
};
