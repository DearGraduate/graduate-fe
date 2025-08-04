import CustomButton from "../../components/common/button";
import photoryImg from "../../assets/icons/photory.png"; 

export default function ErrorPage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 16px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100vh",
          backgroundColor: "var(--color-main)",
          color: "var(--color-text-white)",
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "393px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              textAlign: "center",
              position: "relative",
              top: "104px",
              fontSize: "24px",
              fontWeight: 700,
              marginBottom: "10px",
              fontFamily: "Pretendard",
            }}
          >
            앗! 이 페이지는 찾을 수 없어요.
          </h1>
          <p
            style={{
              fontSize: "14px",
              textAlign: "center",
              position: "relative",
              top: "104px",
              fontWeight: 500,
              fontFamily: "Ydestreet",
            }}
          >
            다시 가고 싶은 페이지를 찾지 못했어요.
            <br />
            아래 메뉴에서 다른 페이지를 찾아보세요!
          </p>
        </div>

        <img
          src={photoryImg}
          alt="포토리"
          style={{
            position: "absolute",
            top: "281px",
            left: "51.3%",
            transform: "translateX(-50%)",
            width: "300px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "695px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          <CustomButton>나의 졸업 앨범으로 돌아가기</CustomButton>
        </div>
      </div>
    </div>
  );
}
