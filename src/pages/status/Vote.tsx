import { Person } from "../../helper/interfase";

export default function Vote({
  game,
  sendTo,
}: {
  game: Person[];
  sendTo: (e: string) => void;
}) {
  const listUsers = game;

  return listUsers.map((e, i: number) => (
    <div key={i} className="flex flex-col gap-5  w-[30%] mx-auto">
      <label className="flex items-center justify-center p-2 border border-main-100 rounded-xl">
        <input
          className="size-5"
          type="radio"
          onChange={() => {
            sendTo(e.user);
          }}
          name="user"
        />
        <span className="mr-2 text-xl">{e.user}</span>
      </label>
    </div>
  ));
}
