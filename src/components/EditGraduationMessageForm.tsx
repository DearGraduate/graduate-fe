import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomCheckbox from "../style/CustomCheckbox";
import CustomButton from "./common/button";
import { useLetterStore } from "../store/letterStore";
import { useAuthStore } from "../store/authStore";
import { editLetter } from "../api/editLetter";
import axios from "axios";
import backButton from "../icons/chevron-back.png";

export default function EditGraduationMessageForm() {
  const navigate = useNavigate();
  const selectedLetterId = useLetterStore((s) => s.selectedLetterId);
  const accessToken = useAuthStore.getState().accessToken;
  const [letter, setLetter] = useState("");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [picUrl, setPicUrl] = useState<string>("");

  useEffect(() => {
    async function fetchLetter() {
      if (!selectedLetterId || !accessToken) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.photory.site/api/letters/${selectedLetterId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const data = response.data as any;
        setLetter(data.message ?? "");
        setIsPublic(data.isPublic ?? true);
        setPicUrl(data.picUrl ?? "");
      } catch (e) {
        alert("축하글 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchLetter();
  }, [selectedLetterId, accessToken]);

  async function handleEdit() {
    if (!selectedLetterId || !accessToken) return;
    if (!letter.trim()) {
      alert("편지를 입력해 주세요.");
      return;
    }
    try {
      await editLetter(String(selectedLetterId), accessToken, letter, isPublic);
      alert("축하 메시지가 성공적으로 수정되었습니다.");
      navigate("/");
    } catch (e) {
      alert("수정에 실패했습니다.");
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
            maxLength={5}
            style={{
              width: "288px",
              height: "26px",
              borderRadius: "5px",
              paddingLeft: "10px",
              border:"0.5px solid var(--color-line)",
              marginBottom: "5px",
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
            <CustomButton>
              {"축하글 수정 완료하기"}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}