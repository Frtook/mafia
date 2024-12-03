import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { getMafi, getRuleAR } from "../helper/helper";
import List from "./List";
import Conditonal from "../components/Conditonal";
import { gameRule } from "../helper/staticVar";

export default function Start() {
  const location = useLocation();
  const navigate = useNavigate();
  const gameStruct = location.state.game;
  const users = location.state.users;
  const [next, setNext] = useState(0);
  const currentUser = gameStruct[next] || {};
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);

  function getChildData(data: string) {
    gameStruct[next].target = data;
  }

  return (
    <div>
      <Link to="/">
        <img
          src="/icons/home.svg"
          alt="home page"
          className="bg-main-200 p-2 size-[50px] rounded-2xl mr-5 mt-7 cursor-pointer"
        />
      </Link>
      <main className="w-[90%] mx-auto shadow-xl text-center mt-8 flex flex-col gap-5">
        <p className="mb-5 text-3xl font-bold text-main-200">
          {currentUser.user}
        </p>

        <Conditonal condtion={!show}>
          <Button
            className="mx-auto bg-transparent border border-main-100 w-fit"
            text={"اظهار"}
            handleClick={() => setShow(true)}
          />
        </Conditonal>

        <Conditonal condtion={show}>
          <p className="text-3xl">
            انت :
            <span className="text-main-100">{getRuleAR(currentUser.rule)}</span>
          </p>
          <img
            className="mx-auto bg-white size-20"
            src={`/icons/${currentUser.rule}.png`}
            alt={currentUser.rule}
          />

          <Conditonal condtion={like}>
            <img
              src="/icons/like.png"
              className="mx-auto size-1/4"
              alt="like"
            />
          </Conditonal>

          <Conditonal condtion={disLike}>
            <img
              src="/icons/dislike.png"
              className="mx-auto size-1/4"
              alt="like"
            />
          </Conditonal>

          <Conditonal condtion={gameRule.includes(currentUser.rule)}>
            <List
              users={users}
              rule={currentUser.rule}
              sendTo={(e) => {
                getChildData(e);
                if (currentUser.rule === "inspector") {
                  if (currentUser.target === getMafi(gameStruct)) {
                    if (!disLike) {
                      setLike(true);
                    }
                  } else {
                    if (!like) {
                      setDisLike(true);
                    }
                  }
                }
              }}
            />
          </Conditonal>
        </Conditonal>

        <Button
          className="mt-5"
          handleClick={() => {
            setNext((prev) => (prev < users.length - 1 ? prev + 1 : prev));
            setShow(false);
            setDisLike(false);
            setLike(false);
            if (next === users.length - 1) {
              navigate("/status", {
                state: { gameStruct },
              });
            }
          }}
          text="التالي"
        />
      </main>
    </div>
  );
}
