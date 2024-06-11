import { useRequest } from 'ahooks';
import { Blog } from '../utils/blog.utils';
import { updateBearish, updateBullish } from '../screen/Trending/serivce';

export const useReaction = () => {
  const { runAsync: runBlogsBear } = useRequest(updateBearish, {
    manual: true,
  });
  const { runAsync: runBlogsBull } = useRequest(updateBullish, {
    manual: true,
  });
  const onBear = (
    item: Blog,
    callback?: (data: Blog, position: any) => void,
    position?: number
  ) => {
    if (item.reaction === 'BEAR') return;
    const data: Blog = {
      ...item,
      reaction: 'BEAR',
      total_bear: item.total_bear + 1,
      total_bull: item.total_bull - 1 >= 0 ? item.total_bull - 1 : 0,
    };
    callback  && callback(data, position);
    runBlogsBear(item?.id);
  };
  const onBull = (
    item: Blog,
    callback?: (data: Blog, position: any ) => void,
    position?: number
  ) => {
    if (item.reaction === 'BULL') return;

    const data: Blog = {
      ...item,
      reaction: 'BULL',
      total_bull: item.total_bull + 1,
      total_bear: item.total_bear - 1 >= 0 ? item.total_bear - 1 : 0,
    };
    callback  && callback(data, position);
    runBlogsBull(item?.id);
  };

  return { onBull, onBear };
};
