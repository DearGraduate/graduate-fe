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
  const selectedLetterData = useLetterStore((s) => s.selectedLetterData);
  const accessToken = useAuthStore.getState().accessToken;
  const [author, setAuthor] = useState(selectedLetterData?.writerName ?? "");
  const [letter, setLetter] = useState(selectedLetterData?.message ?? "");
  const [isPublic, setIsPublic] = useState<boolean>(
    selectedLetterData?.isPublic ?? true
  );
  const [loading, setLoading] = useState(false);
  const [picUrl, setPicUrl] = useState<string>(
    selectedLetterData?.picUrl ?? ""
  );

  useEffect(() => {
    console.log("selectedLetterData:", selectedLetterData);
    setAuthor(selectedLetterData?.writerName ?? "");
    setLetter(selectedLetterData?.message ?? "");
    setIsPublic(selectedLetterData?.isPublic ?? true);
    setPicUrl(selectedLetterData?.picUrl ?? "");
  }, [selectedLetterData]);

  async function handleEdit() {
    if (!selectedLetterData?.id || !accessToken) return;
    if (!letter.trim()) {
      alert("편지를 입력해 주세요.");
      return;
    }
    try {
      await editLetter(
        String(selectedLetterData.id),
        accessToken,
        author,
        letter,
        isPublic
      );
      alert("축하 메시지가 성공적으로 수정되었습니다.");
      navigate("/");
    } catch (e) {
      alert("수정에 실패했습니다.");
    }
  }

  return (
    <div className="min-h-screen w-full bg-[var(--color-main)] flex justify-center items-start">
      <div className="w-full max-w-[393px] min-h-screen box-border mx-auto flex flex-col relative rounded-xl text-white">
        <div className="relative w-full">
          <img
            src={backButton}
            alt="뒤로가기"
            className="w-5 h-5 absolute top-[70px] left-[25px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="px-6 w-full">
          <div className="mb-2 mt-[110px]">
            <h2 className="text-2xl font-bold">축하글 수정하기</h2>
          </div>
          <label className="text-sm block mb-2">
            작성자 이름{" "}
            <span className="text-[#FF8F8F]">*</span>
          </label>
          <input
            type="text"
            placeholder="본명으로 작성해 주세요!"
            maxLength={5}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full h-7 rounded px-2 border border-[0.5px] border-[var(--color-line)] mb-1 text-xs text-white bg-transparent box-border"
          />

          <div style={{ height: "25px" }} />

            <label className="text-2xl font-bold block mb-2 ml-1">사진 첨부</label>
            <div className="mb-2 w-full flex flex-col items-start pl-1">
            {picUrl ? (
              <img
              src={picUrl}
              alt="첨부사진"
              className="w-[112px] h-[107px] rounded-lg block"
              />
            ) : (
              <div className="w-[112px] h-[107px] bg-[#eee] rounded-lg block" />
            )}
            </div>
            <div style={{ height: "25px" }} />
            <label className="text-2xl font-bold mb-2 block">편지쓰기</label>
          <div className="relative w-full mb-4">
            <textarea
              placeholder="졸업자에게 편지를 작성해 주세요😉"
              maxLength={300}
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              className="w-full h-[121px] p-2 pb-5 rounded border border-[var(--color-line)] text-xs resize-none bg-transparent text-white box-border"
            />
            <div className="absolute bottom-3 right-2 text-xs text-[var(--color-text-gray)] pointer-events-none">
              {letter.length}/300
            </div>
          </div>

          <label className="text-sm block mb-2">
            공개 설정{" "}
            <span className="text-[#FF8F8F]">*</span>
          </label>
          <div className="flex gap-3 mb-24">
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

          <div className="w-full max-w-[288px] mx-auto mb-8">
            <CustomButton onClick={handleEdit} className="w-full">
              {"축하글 수정 완료하기"}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
