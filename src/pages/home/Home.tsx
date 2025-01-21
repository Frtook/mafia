//images
import infoImage from "../..//assets/icons/info.svg";
import userImage from "../..//assets/icons/add-users.svg";
//components
import Button from "../../components/ui/Button.tsx";
import Conditonal from "../../components/Conditonal.tsx";
//hooks
import { useState, useEffect } from "react";
//home
import Popup from "./Popup.tsx";
import Card from "./Card.tsx";
//helper
import { getRondomArray, getStructGame } from "../../helper/helper.ts";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../../helper/localStorage.js";
import Info from "./Info.tsx";
import { gameRule } from "../../helper/staticVar.ts";

export default function Home() {
  const navigate = useNavigate();
  const localUsers = JSON.parse(getItem("users") || "[]");
  const [isPopup, setIsPopup] = useState({
    info: false,
    addUser: false,
    EditUser: false,
  });

  const [users, setUsers] = useState(localUsers);
  const [user, setUser] = useState("");
  const [indexEdit, setIndexEdit] = useState(0);

  useEffect(() => {
    setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (isPopup.EditUser) {
      setUser(users[indexEdit] || "");
    }
  }, [isPopup.EditUser, indexEdit, users]);

  const handleStartClick = () => {
    const randomUsers = getRondomArray(users);
    const rules = getRondomArray(
      gameRule.concat(Array(users.length - 3).fill("citizen"))
    );
    const game = getStructGame(randomUsers, rules);
    navigate("/start", {
      state: { game, users: randomUsers },
    });
  };

  const handleAddUser = () => {
    if (user.trim()) {
      setIsPopup({ ...isPopup, addUser: false });
      setUsers([...users, user]);
      setUser("");
    }
  };
  const handleEditUser = () => {
    setUsers([...users, user].filter((_, index) => index !== indexEdit));
    setIsPopup({ ...isPopup, EditUser: false });
    setUser("");
  };

  const handleKeyDownAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddUser();
    }
  };
  const handleKeyDownEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEditUser();
    }
  };
  return (
    <div className="container p-4 mx-auto ">
      <div className="flex items-center gap-5">
        <button onClick={() => setIsPopup({ ...isPopup, info: true })}>
          <img className="size-16" src={infoImage} alt="" />
        </button>
        <h1 className="text-center">
          لعبة "مافيا" هي لعبة جماعية حيث يحاول الفريق كشف المافيا قبل أن يقضي
          عليهم.
        </h1>
      </div>
      <Conditonal condtion={users}>
        <div className="grid grid-cols-1 gap-5 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((e: string, i: number) => (
            <Card
              name={e}
              key={i}
              handleDelete={() => {
                setUsers([...users].filter((_, index) => i !== index));
              }}
              handleEdit={() => {
                setIndexEdit(i);
                setIsPopup({ ...isPopup, EditUser: true });
              }}
            />
          ))}
        </div>
      </Conditonal>
      {/* start button */}
      <div className="flex mt-16">
        <Button
          className="w-full rounded-l-none"
          disabled={users.length < 4}
          text="بدا"
          handleClick={handleStartClick}
        />

        <button onClick={() => setIsPopup({ ...isPopup, addUser: true })}>
          <img
            src={userImage}
            alt=""
            className=" bg-main-100 hover:bg-main-100/70 rounded-l-2xl h-[40px]"
          />
        </button>
      </div>
      {/* Popup Add */}
      <Conditonal condtion={isPopup.addUser}>
        <Popup
          className="translate-y-[80%]"
          handleClose={() => setIsPopup({ ...isPopup, addUser: false })}
          title="اضافه لاعب"
          handleClick={handleAddUser}
        >
          <input
            className="w-full p-2 bg-transparent border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-main-100 border-main-100"
            placeholder="ادخل لاعب"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onKeyDown={handleKeyDownAdd}
            type="text"
            autoFocus={true}
          />
        </Popup>
      </Conditonal>
      {/* Popup Edit */}
      <Conditonal condtion={isPopup.EditUser}>
        <Popup
          className="translate-y-[80%]"
          handleClose={() => setIsPopup({ ...isPopup, EditUser: false })}
          title={`تعديل ${users[indexEdit]}`}
          handleClick={handleEditUser}
        >
          <input
            className="w-full p-2 bg-transparent border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-main-100 border-main-100"
            placeholder="ادخل لاعب"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onKeyDown={handleKeyDownEdit}
            type="text"
            autoFocus={true}
          />
        </Popup>
      </Conditonal>
      {/* Popup Info */}
      <Conditonal condtion={isPopup.info}>
        <Popup
          handleClose={() => setIsPopup({ ...isPopup, info: false })}
          className="translate-y-[30px]"
          title="شرح اللعبة"
          handleClick={() => setIsPopup({ ...isPopup, info: false })}
        >
          <Info />
        </Popup>
      </Conditonal>
    </div>
  );
}
