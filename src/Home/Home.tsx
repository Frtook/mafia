import infoImage from "../assets/icons/Info Square 02 Contained Filled.svg";
import userImage from "../assets/icons/add-users.svg";

import { useState, useEffect } from "react";
import Popup from "./Popup";
import Card from "./Card";
import Button from "../components/ui/Button";
import { getRondomArray, getStructGame } from "../helper/helper.ts";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../helper/cookeis.js";
import Info from "./Info.tsx";
import Conditonal from "../components/Conditonal.tsx";
import { gameRule } from "../helper/staticVar.ts";

export default function Home() {
  const navigate = useNavigate();
  const [isPopup, setIsPopup] = useState({
    info: false,
    addUser: false,
    EditUser: false,
  });
  const cookieValue = getCookie("users") || "";
  const parsedUsers = cookieValue ? JSON.parse(cookieValue) : [];
  const [users, setUsers] = useState(parsedUsers);

  useEffect(() => {
    const storedUsers = getCookie("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    setCookie("users", JSON.stringify(users));
  }, [users]);

  const [user, setUser] = useState("");
  const [indexEdit, setIndexEdit] = useState(0);

  return (
    <div className="container p-4 mx-auto ">
      <div className="flex items-center gap-5">
        <button onClick={() => setIsPopup({ ...isPopup, info: true })}>
          <img className="size-16" src={infoImage} alt="" />
        </button>
        <p className="text-center">
          للعبة دي اسمها "مافيا" وبتتلعب بين مجموعة من الناس. كل شخص في اللعبة
          بيبقى ليه دور معين، والهدف إن الفريق الطيب يعرف مين المافيا قبل ما
          المافيا يخلصوا عليهم.
        </p>
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
      <div className="flex mt-16">
        <Button
          className="w-full rounded-l-none"
          disabled={users.length < 4}
          text="بدا"
          handleClick={() => {
            const randomUsers = getRondomArray(users);
            const rules = getRondomArray(
              gameRule.concat(Array(users.length - 3).fill("citizen"))
            );
            const game = getStructGame(randomUsers, rules);
            navigate("/start", {
              state: { game, users: randomUsers },
            });
          }}
        />

        <button onClick={() => setIsPopup({ ...isPopup, addUser: true })}>
          <img
            src={userImage}
            alt=""
            className=" bg-main-100 hover:bg-main-100/70 rounded-l-2xl h-[40px]"
          />
        </button>
      </div>
      <Conditonal condtion={isPopup.addUser}>
        <Popup
          className="translate-y-[80%]"
          handleClose={() => setIsPopup({ ...isPopup, addUser: false })}
          title="اضافه لاعب"
          handleClick={() => {
            if (user.trim()) {
              setIsPopup({ ...isPopup, addUser: false });
              setUsers([...users, user]);
              setUser("");
            }
          }}
        >
          <input
            className="w-full p-2 bg-transparent border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-main-100 border-main-100"
            placeholder="ادخل لاعب"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type="text"
            autoFocus={true}
          />
        </Popup>
      </Conditonal>
      <Conditonal condtion={isPopup.EditUser}>
        <Popup
          className="translate-y-[80%]"
          handleClose={() => setIsPopup({ ...isPopup, EditUser: false })}
          title={`تعديل ${users[indexEdit]}`}
          handleClick={() => {
            setUsers(
              [...users, user].filter((_, index) => index !== indexEdit)
            );
            setIsPopup({ ...isPopup, EditUser: false });
            setUser("");
          }}
        >
          <input
            className="w-full p-2 bg-transparent border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-main-100 border-main-100"
            placeholder="ادخل لاعب"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type="text"
            autoFocus={true}
          />
        </Popup>
      </Conditonal>

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
