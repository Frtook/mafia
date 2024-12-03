import Button from "../components/ui/Button";

export default function Popup({
  title,
  children,
  handleClick,
  className,
  handleClose,
}: {
  title: string;
  children?: React.ReactNode;
  handleClick: () => void;
  className?: string;
  handleClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/30">
      <div
        className={`flex flex-col gap-5 p-5 mx-4  sm:w-[70%] sm:mx-auto lg:w-[50%] text-white shadow-sm bg-main-400 shadow-white ${className}`}
      >
        <div className="flex justify-between">
          <h3 className="font-bold">{title}</h3>
          <span
            onClick={handleClose}
            className="p-1 text-xl text-center rounded-lg cursor-pointer si bg-main-200 size-10"
          >
            x
          </span>
        </div>
        {children}
        <Button
          className={"self-center"}
          text="موافق"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}
