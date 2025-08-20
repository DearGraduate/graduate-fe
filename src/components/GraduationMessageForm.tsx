import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import backButton from "../icons/chevron-back.png";
import "../style/colors.css";
import CustomCheckbox from "../style/CustomCheckbox";
import CustomButton from "./common/button";
import PhotoAttachStrip from "../components/PhotoAttach";
import axios from "axios";
import { useAlbumStore } from '../store/albumStore'
import { useAuthStore } from '../store/authStore'; 


export default function GraduationMessageForm() {
  const navigate = useNavigate();
  //const { albumId = "1" } = { albumId: "1" };
  //기존에 하드 코딩 되어있던 부분 앨범 ID 로 변경
  const albumId = useAlbumStore(s => s.albumId)
  const [author, setAuthor] = useState("");
  const [letter, setLetter] = useState("");
  const [isPublic, setIsPublic] = useState<null | boolean>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [defaultPicKey, setDefaultPicKey] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const accessToken = useAuthStore.getState().accessToken; // 토큰 가져오기

  function onDefaultPick(url: string) {
    setDefaultPicKey(url);
    setPreviewUrl("");
    setFile(null);
  }

  function onFileSelected(selectedFile: File) {
    setDefaultPicKey("");
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = typeof ev.target?.result === "string" ? ev.target.result : "";
      setPreviewUrl(url);
    };
    reader.readAsDataURL(selectedFile);
  }

  async function saveMessage() {
    if (!letter.trim() || isPublic === null) {
      alert("편지, 공개여부를 모두 입력해 주세요.");
      return;
    }
    if (!author.trim()) {
      alert("작성자 이름을 입력해 주세요.");
      return;
    }
    const formData = new FormData();

    const jsonData = new Blob(
      [JSON.stringify({ writerName: author, message: letter, isPublic })],
      { type: "application/json" }
    );
    formData.append("data", jsonData);
    // 파일이 있을 때만 file 필드 추가
    if (file) {
      formData.append("file", file, file.name);
      console.log("업로드 파일 정보:", file);
      console.log("파일명:", file.name);
      const fileUrl = URL.createObjectURL(file);
      console.log("이미지 파일 브라우저 미리보기 URL:", fileUrl);
    }

    Array.from(formData.entries()).forEach(pair => {
      console.log("id", albumId)
      console.log("FormData:", pair[0], pair[1]);
    });

    try {
      const response = await axios.post(
        `https://api.photory.site/api/albums/${albumId}/letter`,
        formData,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("서버 응답:", response.data);
      alert("축하 메시지가 성공적으로 등록되었습니다.");
      setAuthor("");
      setLetter("");
      setIsPublic(null);
      setPreviewUrl("");
      setDefaultPicKey("");
      setFile(null);
      navigate("/"); // 작성 성공 시 메인 페이지로 이동
    } catch (e: any) {
      console.error("업로드 실패:", e.response?.data || e);
      alert("네트워크 오류가 발생했습니다.");
    }
  }

  return (
    <div
      style={{
        // position: "fixed",
        inset: 0,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "0px",
        paddingBottom: "0px",
        overflowY: "auto",
        // overflow: "hidden",
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
            onClick={() => navigate(-1)} 
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
          <div
            style={{
              marginBottom: "25px",
            }}
          >
            <PhotoAttachStrip
              value={previewUrl || defaultPicKey}
              onChange={onDefaultPick}
              onFileSelected={onFileSelected}
            />
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
            <CustomButton onClick={saveMessage}>
              {"축하글 작성 완료하기"}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}