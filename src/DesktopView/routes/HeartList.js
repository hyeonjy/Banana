import { useEffect } from "react";
import MypageContents from "../components/MypageContents";
import { useState } from "react";
import useAxios from "../../useAxio";
import SkeletonofMypage from "./SkeletonOfMypage";

function HeartList({ item: heartPosts }) {
  return heartPosts ? (
    <MypageContents item={heartPosts.posts} cate="찜" />
  ) : (
    <SkeletonofMypage />
  );
}

export default HeartList;
