import { useState, useEffect } from "react";
import backButton from "../icons/chevron-back.png";
import "../style/colors.css";
import CustomCheckbox from "../style/CustomCheckbox";
import CustomButton from "./common/button";
import PhotoAttachStrip from "../components/PhotoAttach";
import axios from "axios";

interface EditGraduationMessageFormProps {
  albumId: string;
  letterId: string;
  initialAuthor?: string;
  initialLetter?: string;
  initialIsPublic?: boolean;
  initialPicUrl?: string;
}

export default function EditGraduationMessageForm({
  albumId = "1",
  letterId,
  initialAuthor = "",
  initialLetter = "",
  initialIsPublic = true,
  initialPicUrl = "",
}: EditGraduationMessageFormProps) {
  const [author, setAuthor] = useState(initialAuthor);
  const [letter, setLetter] = useState(initialLetter);
  const [isPublic, setIsPublic] = useState<null | boolean>(initialIsPublic);
  const [previewUrl, setPreviewUrl] = useState<string>(initialPicUrl);
  const [defaultPicKey, setDefaultPicKey] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  function onDefaultPick(url: string) {
    setDefaultPicKey(url);
    setPreviewUrl(url);
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

  async function updateMessage() {
    if (!letter.trim() || isPublic === null) {
      alert("편지, 공개여부를 모두 입력해 주세요.");
      return;
    }
    if (!author.trim()) {
      alert("작성자 이름을 입력해 주세요.");
      return;
    }
    const formData = new FormData();

    // PATCH는 수정할 내용만 보내면 됩니다
    const jsonData = new Blob(
      [JSON.stringify({ writerName: author, message: letter, isPublic })],
      { type: "application/json" }
    );
    formData.append("data", jsonData);

    if (file) {
      formData.append("file", file, file.name);
    } else if (defaultPicKey) {
      const urlBlob = new Blob([defaultPicKey], { type: "text/plain" });
      formData.append("file", urlBlob, "defaultPic.txt");
    }

    // 디버깅: FormData 내용 출력
    Array.from(formData.entries()).forEach(pair => {
      console.log("FormData:", pair[0], pair[1]);
    });

    try {
      const response = await axios.patch(
        `https://api.photory.site/api/letters/${letterId}`,
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log("서버 응답:", response.data);
      alert("축하 메시지가 성공적으로 수정되었습니다.");
    } catch (e: any) {
      console.error("수정 실패:", e.response?.data || e);
      alert("네트워크 오류가 발생했습니다.");
    }
  }

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
              졸업 축하글 수정하기
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
            <CustomButton onClick={updateMessage}>
              {"축하글 수정 완료하기"}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}