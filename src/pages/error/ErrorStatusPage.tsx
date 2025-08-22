import CustomButton from "../../components/common/button";
import photoryImg from "../../assets/icons/tory.png"; 

export default function ErrorPage() {
  return (
    <div
      style={{
        
        inset: 0,
        backgroundColor: "var(--color-main)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 16px",
        overflow: "hidden",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          height: "100dvh",
          backgroundColor: "var(--color-main)",
          color: "var(--color-text-white)",
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "393px",
          display: "flex",            // ← 추가
          flexDirection: "column",    // ← 추가
          alignItems: "center",       // ← 추가
          justifyContent: "center",   // ← 추가
          paddingTop: "64px",
        }}
      >
        <div style={{ marginBottom: "20px", marginTop: "10px" }}>
          <h1
            style={{
              textAlign: "center",
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
            display:"flex",
            justifyContent: "center",
            width: "273px",
            marginTop: "20%",
            
          }}
        />
        <div
          style={{  
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            cursor: "pointer",
            marginTop: "20%",    
            boxSizing: "border-box",
            paddingBottom: "20px",
            width: "100%",
          }}
        >
          <CustomButton className="w-[77%]">나의 앨범으로 돌아가기</CustomButton>
        </div>
      </div>
    </div>
  );
}
