export const ButtonTextComponent = ({
  text,
  isActive,
  onClickButton,
}: {
  text: string;
  isActive: boolean;
  onClickButton?: () => void;
}) => {
  return (
    <button
      className={`mb-2 text-sm text-slate-800 ${
        isActive ? "font-semibold" : ""
      }`}
      onClick={() => onClickButton && onClickButton()}>
      {text}
    </button>
  );
};
