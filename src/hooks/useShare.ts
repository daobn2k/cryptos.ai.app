import { useRequest } from 'ahooks';
import { serviceShareBlog } from '../screen/Trending/serivce';
import { Blog } from '../utils/blog.utils';

export const useShare = () => {
  const { run: runShare } = useRequest(serviceShareBlog, { manual: true });

  const onShare = async (
    item: Blog,
    callback?: (data: Blog, position: any) => void,
    position?: number
  ) => {
    const data: Blog = {
      ...item,
      total_shared: item.total_shared + 1,
    };
    // onOpen({ title: "You’re copied link", id: item.id });
    runShare(item.id);
    // const lang = localStorageUtils.get("lang");
    // const url = `${process.env.NEXT_PUBLIC_WEB_URL}/${lang || "en"}/view-discover?slug=${item?.slug}`;
    // onCopy(url);
    callback && callback(data, position);
  };

  return { onShare };
};
