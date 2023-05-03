import MypageContents from "../components/MypageContents";

function ShareList({ item }) {
  return item ? <MypageContents item={item} /> : <span>Loading...</span>;
}
export default ShareList;
