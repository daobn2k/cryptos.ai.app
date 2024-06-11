import { useRequest } from 'ahooks';
import { Blog } from '../utils/blog.utils';
import { deleteBlogSaved, updateBlogSaved } from '../screen/Trending/serivce';

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
      //   onOpen({ title: "You’re unsaved thread" });
      const data: Blog = {
        ...item,
        is_saved: false,
        total_saved: item.total_saved - 1,
      };
      callback && callback(data, position);
      await deleteSaved(item.id);
    } else {
      //   onOpen({ title: "You’re saved thread" });
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
