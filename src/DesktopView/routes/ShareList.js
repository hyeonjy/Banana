import MypageContents from "../components/MypageContents";

function ShareList({ item }) {
  return item ? (
    <MypageContents item={item} cate="나눔" />
  ) : (
    <span>Loading...</span>
  );
}
export default ShareList;
