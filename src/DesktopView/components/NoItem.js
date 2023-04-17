function NoItem({ content = "나눔이" }) {
  return (
    <div style={{ lineHeight: "60vh", width: "100%", textAlign: "center" }}>
      <span style={{ fontSize: "18px", verticalAlign: "middle" }}>
        등록된 {content} 없습니다😢
      </span>
    </div>
  );
}
export default NoItem;
