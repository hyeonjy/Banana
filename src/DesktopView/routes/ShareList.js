import MypageContents from "../components/MypageContents";
import SkeletonofMypage from "./SkeletonOfMypage";

function ShareList({ item }) {
  return item ? (
    <MypageContents item={item} cate="나눔" />
  ) : (
    <SkeletonofMypage />
  );
}
export default ShareList;
