import { ViewBlog } from "@/src/screen/ViewBlog";
import { useLocalSearchParams } from "expo-router";

const ViewPage = () => {
  const { id, blog_id } = useLocalSearchParams();
  return <ViewBlog slug={id} blog_id={blog_id} />;
};

export default ViewPage;
