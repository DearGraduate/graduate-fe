import { useState } from "react";
//import { useParams } from "react-router-dom";
import backButton from "../icons/chevron-back.png";
import "../style/colors.css";
import CustomCheckbox from "../style/CustomCheckbox";
import CustomButton from "./common/button";
import PhotoAttachStrip from "../components/PhotoAttach";

export default function GraduationMessageForm() {
  const [author, setAuthor] = useState("");
  const [letter, setLetter] = useState("");
  const [isPublic, setIsPublic] = useState<null | boolean>(null);
  // const { albumId } = useParams<{ albumId: string }>();
  const albumId = "1";
  const [picUrl, setPicUrl] = useState<string>("");

  const API_BASE = "https://api.photory.site";

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); 

    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Upload failed:", res.status, text);
        alert(`업로드 실패 (${res.status})`);
        return;
      }

      const data = await res.json();
      const url = data?.url ?? data?.data?.url ?? data?.result?.url;
      if (!url) {
        alert("응답에서 이미지 URL을 찾지 못했어요.");
        return;
      }
      setPicUrl(url);
    } catch (e) {
      console.error(e);
      alert("이미지 업로드 중 오류가 발생했어요.");
    }
  };

  const submitMessage = async () => {
    if (!albumId) {
      alert("albumId가 없습니다.");
      return;
    }
    if (!author.trim() || !letter.trim() || isPublic === null || !picUrl) {
      alert("모든 항목을 입력해 주세요");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/albums/${albumId}/letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          writer_name: author,
          pic_url: picUrl,
          message: letter,
          isPublic,
        }),
      });

      const data = await res.json();
      if (res.ok && data?.isSuccess) {
        alert(data?.message || "등록 완료!");
      } else {
        alert("등록 실패: " + (data?.message ?? "알 수 없는 오류"));
      }
    } catch (e) {
      console.error(e);
      alert("등록 중 오류가 발생했어요.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "0px",
        paddingBottom: "0px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "852px",
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
          <div style={{ marginBottom: "7px", marginTop: "110px" }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              졸업 축하 작성하기
            </h2>
          </div>
          <label
            style={{
              fontSize: "14px",
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
            maxLength={5}
            onChange={(e) => setAuthor(e.target.value)}
            style={{
              width: "278px",
              height: "26px",
              borderRadius: "5px",
              paddingLeft: "10px",
              border: "0.5px solid var(--color-line)",
              marginBottom: "25px",
              fontSize: "10px",
              color: "var(--color-text-white)",
              backgroundColor: "transparent",
            }}
          />

          <label
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              display: "block",
              marginBottom: "10px",
            }}
          >
            사진 첨부
          </label>

          <PhotoAttachStrip
            value={picUrl}
            onChange={(url) => setPicUrl(url)} // 기본 이미지 선택 시 호출
            onFileSelected={(file) => handleImageUpload(file)} // 파일 선택 시 업로드 로직 실행
          />
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

          <div
            style={{
              position: "absolute",
              top: "750px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            <CustomButton onClick={submitMessage}>
              축하글 작성 완료하기
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
