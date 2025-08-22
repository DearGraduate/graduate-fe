import { useRef, useState } from "react";
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
  const fileRef = useRef<File | null>(null);
  const accessToken = useAuthStore.getState().accessToken; 

  function onDefaultPick(url: string) {
    console.log('onDefaultPick called, url:', url);
    setDefaultPicKey(url);
    setPreviewUrl("");
    fileRef.current = null;
  }

  function onFileSelected(selectedFile: File) {
    console.log('onFileSelected called, selectedFile:', selectedFile);
    setDefaultPicKey("");
    fileRef.current = selectedFile;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = typeof ev.target?.result === "string" ? ev.target.result : "";
      setPreviewUrl(url);
    };
    reader.readAsDataURL(selectedFile);
    setTimeout(() => {
      console.log('fileRef.current after set:', fileRef.current);
    }, 100);
  }

  async function saveMessage(file: File | null) {
    console.log('saveMessage called, file:', file);
    console.log('saveMessage defaultPicKey:', defaultPicKey);
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
    if (file) {
      formData.append("file", file, file.name);
      console.log("업로드 파일 정보:", file);
      console.log("파일명:", file.name);
      const fileUrl = URL.createObjectURL(file);
      console.log("이미지 파일 브라우저 미리보기 URL:", fileUrl);
    } else if (defaultPicKey) {
      let key = "";
      if (defaultPicKey.includes("default1")) key = "defaultImage1";
      else if (defaultPicKey.includes("default2")) key = "defaultImage2";
      else if (defaultPicKey.includes("default3")) key = "defaultImage3";
      console.log('FormData에 append되는 picUrl:', key);
      formData.append("picUrl", key);
      console.log("formData.get('picUrl') 직후:", formData.get('picUrl'));
    }

    Array.from(formData.entries()).forEach(pair => {
      if (pair[0] === 'picUrl') {
        console.log("FormData picUrl 값:", pair[1]);
      }
      console.log("id", albumId)
      console.log("FormData:", pair[0], pair[1]);
    });

    console.log("사진 첨부 상태 - file:", file);
    console.log("사진 첨부 상태 - previewUrl:", previewUrl);
    console.log("사진 첨부 상태 - defaultPicKey:", defaultPicKey);
    console.log("axios.post 직전 formData.get('picUrl'):", formData.get('picUrl'));

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
      console.log("서버 응답 후 formData.get('picUrl'):", formData.get('picUrl'));
      alert("축하 메시지가 성공적으로 등록되었습니다.");
      navigate(`/home/${albumId}`);
      setAuthor("");
      setLetter("");
      setIsPublic(null);
      setPreviewUrl("");
      setDefaultPicKey("");
      fileRef.current = null;
    } catch (e: any) {
      console.error("업로드 실패:", e.response?.data || e);
      alert("네트워크 오류가 발생했습니다.");
    }
  }

  const isAuthorOverLimit = author.length > 5;

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
            <h2 className="text-2xl font-bold">졸업 축하 작성하기</h2>
          </div>
          <label className="text-sm block mb-2">작성자 이름 <span className="text-[#FF8F8F]">*</span></label>
            <input
            type="text"
            placeholder="본명으로 작성해 주세요!"
            value={author}
            maxLength={5}
            onChange={(e) => setAuthor(e.target.value)}
            className={`w-full h-7 rounded px-2 border ${isAuthorOverLimit ? 'border-[#FF5A5A] border-2' : 'border-[0.5px] border-[var(--color-line)]'} mb-1 text-xs text-white bg-transparent box-border`}
            />

            <div style={{ height: "25px" }} />

            <label className="text-2xl font-bold block mb-2">사진 첨부</label>
          <div className="mb-6 w-full">
            <PhotoAttachStrip
              value={previewUrl || defaultPicKey}
              onChange={onDefaultPick}
              onFileSelected={onFileSelected}
            />
          </div>
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

          <label className="text-sm block mb-2">공개 설정 <span className="text-[#FF8F8F]">*</span></label>
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
            <CustomButton onClick={() => saveMessage(fileRef.current)} className="w-full">
              {"축하글 작성 완료하기"}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}