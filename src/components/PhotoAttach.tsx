import { useRef } from "react";
import addPhotoIcon from "../assets/icons/addphoto.png";
import default1 from "../assets/icons/default1.png";
import default2 from "../assets/icons/default2.png";
import default3 from "../assets/icons/default3.png";

type Props = {
  value?: string;
  onChange: (url: string) => void;
  onFileSelected?: (file: File) => void;
  viewportWidth?: number; 
};

export default function PhotoAttachStrip({
  value,
  onChange,
  onFileSelected,
  viewportWidth = 288, 
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const defaults = [default1, default2, default3];

  const openPicker = () => fileRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onFileSelected?.(file);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = typeof ev.target?.result === "string" ? ev.target.result : "";
      if (url) onChange(url);
    };
    reader.readAsDataURL(file);
  };

  const Tile = ({
    src,
    isSelected,
    onClick,
  }: {
    src: string;
    isSelected?: boolean;
    onClick?: () => void;

  }) => (
    <div
      onClick={onClick}
      style={{
        minWidth: 126,
        height: 104,
        boxSizing: "border-box",
        borderRadius: isSelected ? 8 : 0,
        border: isSelected
          ? "2px solid #EAFFEF" : "0px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default",

      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );

  return (
    <div style={{ position: "relative", width: viewportWidth }}>
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          padding: "2px 0",
          width: viewportWidth,
          WebkitOverflowScrolling: "touch",    
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        <div onClick={openPicker} style={{ cursor: "pointer" }}>
          <Tile src={addPhotoIcon} isSelected={false} />
        </div>

        {defaults.map((src) => (
          <Tile
            key={src}
            src={src}
            isSelected={value === src}
            onClick={() => onChange(src)}
          />
        ))}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />
    </div>
  );
}
