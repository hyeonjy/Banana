import MypageContents from "../components/MypageContents";

function HeartList({ item }) {
  return item ? <MypageContents item={item} /> : <span>Loading...</span>;
}

export default HeartList;
