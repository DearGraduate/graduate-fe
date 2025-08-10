import { useRef } from "react";
import addPhotoIcon from "../assets/icons/addphoto.png";
import default1 from "../assets/icons/default1.png";
import default2 from "../assets/icons/default2.png";
import default3 from "../assets/icons/default3.png";

type Props = {
  value?: string;                         
  onChange: (url: string) => void;         
  onFileSelected?: (file: File) => void;  
};

export default function PhotoAttachStrip({ value, onChange, onFileSelected }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const defaults = [default1, default2, default3];

  const openPicker = () => fileRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onFileSelected?.(file);

    const reader = new FileReader();
    reader.onload = ev => {
      const url = typeof ev.target?.result === "string" ? ev.target.result : "";
      if (url) onChange(url);
    };
    reader.readAsDataURL(file);
  };

  const Tile = ({
    src,
    isSelected,
    onClick,
    dim = false,
  }: {
    src: string;
    isSelected?: boolean;
    onClick?: () => void;
    dim?: boolean; 
  }) => (
    <div
      onClick={onClick}
      style={{
        minWidth: 120,
        height: 100,
        borderRadius: 12,
        border: isSelected ? "2px solid var(--color-text-white)" : "1px solid rgba(255,255,255,0.6)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: dim ? "rgba(255,255,255,0.85)" : "transparent",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <img
        src={src}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: dim ? "contain" : "cover", opacity: dim ? 0.55 : 1 }}
      />
    </div>
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          padding: "2px 0",
        }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        <div onClick={openPicker} style={{ cursor: "pointer" }}>
          <Tile
            src={addPhotoIcon}
            isSelected={false}
            onClick={openPicker}
            dim
          />
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
