interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onClick: () => void;
}

export default function CustomCheckbox({ label, checked, onClick }: CustomCheckboxProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "10px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <span>{label}</span>
      <div
        style={{
          width: "19px",
          height: "19px",
          borderRadius: "5px",
          border: "1px solid var(--color-line)",
          backgroundColor: checked ? "var(--color-line)" : "transparent",
          transition: "background-color 0.2s ease",
        }}
      />
    </div>
  );
}
