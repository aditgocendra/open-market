import { useFormStatus } from "react-dom";

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

export const ButtonSubmitForm = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type='submit'
      className='flex w-full justify-center bg-slate-800 text-white text-sm rounded-md px-4 py-2 hover:bg-slate-700'>
      {pending ? "Loading..." : title}
    </button>
  );
};
