export default function Card({
  name,
  handleDelete,
  handleEdit,
}: {
  name: string;
  handleDelete: () => void;
  handleEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-10 p-4 border-2 rounded-2xl border-main-100">
      <img src="/icons/User.svg" alt="" />
      <p>{name}</p>
      <div className="flex gap-5">
        <img
          src="/icons/edit.svg"
          onClick={handleEdit}
          className="size-7"
          alt=""
        />
        <img
          src="/icons/delete.svg"
          onClick={handleDelete}
          className="size-7"
          alt=""
        />
      </div>
    </div>
  );
}
