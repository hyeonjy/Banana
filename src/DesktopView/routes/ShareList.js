import { ItemObj } from "../../Data/ItemObj";
import { LoginId } from "../../Data/UserObj";
import MypageContents from "../components/MypageContents";

function ShareList() {
  const shareItems = ItemObj.filter((item) => item.userId === LoginId);
  return <MypageContents item={shareItems} />;
}
export default ShareList;
