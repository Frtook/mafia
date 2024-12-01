export default function List({
  users,
  rule,
  sendTo,
}: {
  users: string[];
  rule: string;
  sendTo: (e: string) => void;
}) {
  const listUsers = users;
  let type: string = "";
  if (rule === "mafia") {
    type = "اقتل";
  }
  if (rule === "physician") {
    type = "احمي";
  }
  if (rule === "inspector") {
    type = "اكشف القاتل";
  }

  return (
    <>
      <span className="text-2xl font-bold ">{type}</span>
      {listUsers.map((e: string, i: number) => (
        <div key={i} className="flex flex-col gap-5  w-[30%] mx-auto">
          <label className="flex items-center justify-center p-2 border border-main-100 rounded-xl">
            <input
              className="size-5"
              type="radio"
              onClick={() => sendTo(e)}
              name="user"
            />
            <span className="mr-2 text-xl">{e}</span>
          </label>
        </div>
      ))}
    </>
  );
}
