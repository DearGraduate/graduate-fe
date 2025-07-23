import { useState } from "react";
import addPhotoIcon from "../icons/addphoto.png";
import backButton from "../icons/chevron-back.png";
import "../style/colors.css";
import CustomCheckbox from "../style/CustomCheckbox";

export default function GraduationMessageForm() {
  const [author, setAuthor] = useState("");
  const [letter, setLetter] = useState("");
  const [isPublic, setIsPublic] = useState<null | boolean>(null);

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
        <div style={{ position: "relative" }}>
          <img
            src={backButton}
            alt="뒤로가기"
            style={{
              width: "20px",
              height: "20px",
              position: "absolute",
              top: "70px",
              left: "25px",
              cursor: "pointer",
            }}
          />
        </div>
        <div style={{ paddingLeft: "52px" }}>
          <div style={{ marginBottom: "24px", marginTop: "110px" }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "7px",
              }}
            >
              졸업 축하 작성하기
            </h2>
            <p style={{ fontSize: "14px" }}>
              친구에게 따뜻한 졸업 축하의 말을
              <br />
              작성해 주세요!
            </p>
          </div>

          <label
            style={{
              fontSize: "14px",
              fontWeight: 600,
              display: "block",
              marginBottom: "10px",
            }}
          >
            작성자 이름 <span style={{ color: "#FF8F8F" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="본명으로 작성해 주세요!"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{
              width: "278px",
              height: "26px",
              borderRadius: "5px",
              paddingLeft: "10px",
              border: "0.5px solid var(--color-line)",
              marginBottom: "32px",
              fontSize: "10px",
              color: "var(--color-text-white)",
              backgroundColor: "transparent",
            }}
          />

          <label
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
              display: "block",
            }}
          >
            사진 첨부
          </label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "29px" }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: "100px",
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={addPhotoIcon}
                  alt="사진 추가"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            ))}
          </div>

          <label
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
              display: "block",
            }}
          >
            편지쓰기
          </label>
          <div
            style={{
              position: "relative",
              width: "278px",
              marginBottom: "17px",
            }}
          >
            <textarea
              placeholder="졸업자에게 편지를 작성해 주세요😉"
              maxLength={300}
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              style={{
                width: "288px",
                height: "121px",
                padding: "10px",
                paddingBottom: "20px",
                borderRadius: "5px",
                border: "0.5px solid var(--color-line)",
                fontSize: "10px",
                resize: "none",
                backgroundColor: "transparent",
                color: "var(--color-text-white)",
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                right: "0px",
                fontSize: "12px",
                color: "var(--color-text-gray)",
                pointerEvents: "none",
              }}
            >
              {letter.length}/300
            </div>
          </div>

          <label
            style={{
              fontSize: "14px",
              fontWeight: 600,
              display: "block",
              marginBottom: "9px",
            }}
          >
            공개 설정 <span style={{ color: "#FF8F8F" }}>*</span>
          </label>
          <div style={{ display: "flex", gap: "13px", marginBottom: "100px" }}>
            <CustomCheckbox
              label="공개"
              checked={isPublic === true}
              onClick={() => setIsPublic(true)}
            />
            <CustomCheckbox
              label="비공개"
              checked={isPublic === false}
              onClick={() => setIsPublic(false)}
            />
          </div>

          <button
            style={{
              width: "290px",
              height: "40px",
              padding: "10px",
              borderRadius: "25px",
              fontWeight: "bold",
              fontSize: "12px",
              backgroundColor: "var(--color-button-calander)",
              color: "var(--color-text-black)",
              border: "none",
              cursor: "pointer",
            }}
          >
            축하글 작성 완료하기
          </button>
        </div>
      </div>
    </div>
  );
}
