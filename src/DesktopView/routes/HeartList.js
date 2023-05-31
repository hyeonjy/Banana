import { useEffect } from "react";
import MypageContents from "../components/MypageContents";
import { useState } from "react";
import useAxios from "../../useAxio";

function HeartList() {
  const [heartPosts, setHeartPosts] = useState();
  const { response, loading, error, executeGet } = useAxios({
    method: "get",
    url: `http://localhost:8080/userpage/heartdata/1`,
  });

  useEffect(() => {
    executeGet();
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log(response);
      setHeartPosts(response.posts);
    }
  }, [response, loading, error]);

  return heartPosts ? (
    <MypageContents item={heartPosts} cate="찜" />
  ) : (
    <span>Loading...</span>
  );
}

export default HeartList;
