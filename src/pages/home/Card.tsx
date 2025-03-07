import editImage from "../../assets/icons/edit.svg";
import useImage from "../../assets/icons/User.svg";
import deleteImage from "../..//assets/icons/delete.svg";
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
      <img src={useImage} alt="" />
      <p>{name}</p>
      <div className="flex gap-5">
        <img src={editImage} onClick={handleEdit} className="size-7" alt="" />
        <img
          src={deleteImage}
          onClick={handleDelete}
          className="size-7"
          alt=""
        />
      </div>
    </div>
  );
}
