import Button from "../components/ui/Button";

export default function Popup({
  title,
  children,
  handleClick,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  handleClick: () => void;
  className?: string;
}) {
  return (
    <div className="fixed inset-0 bg-black/30">
      <div
        className={`flex flex-col gap-5 p-5 mx-4 translate-y-[80%] sm:w-[70%] sm:mx-auto lg:w-[50%] text-white shadow-sm bg-main-400 shadow-white ${className}`}
      >
        <h3 className="font-bold">{title}</h3>
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
