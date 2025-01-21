//images
import homeImage from "../../assets/icons/home.svg";
import likeImage from "../../assets/icons/like.svg";
import disLikeImage from "../../assets/icons/dislike.svg";
//hooks
import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
//helper
import { gameRule } from "../../helper/staticVar";
import { Person } from "../../helper/interfase";
import { getImages, getMafi, getRuleAR } from "../../helper/helper";
//component
import Button from "../../components/ui/Button";
import List from "./List";
import Conditonal from "../../components/Conditonal";

export default function Start() {
  const location = useLocation();
  const navigate = useNavigate();
  const gameStruct = location.state.game as Person[];
  const users = location.state.users;
  const [next, setNext] = useState(0);
  const currentUser = useMemo(() => gameStruct[next] || {}, [gameStruct, next]);
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (currentUser.rule === "citizen") {
      setIsActive(true);
    }
  }, [currentUser]);

  function getChildData(data: string) {
    gameStruct[next].target = data;
    setIsActive(true);

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
  }

  function handleClickSubmit() {
    setNext((prev) => (prev < users.length - 1 ? prev + 1 : prev));
    setShow(false);
    setDisLike(false);
    setLike(false);
    setIsActive(false);

    if (next === users.length - 1) {
      navigate("/status", {
        state: { gameStruct },
      });
    }
  }

  return (
    <div>
      <Link to="/">
        <img
          src={homeImage}
          alt="home page"
          className="bg-main-200 p-2 size-[50px] rounded-2xl mr-5 mt-7 cursor-pointer"
        />
      </Link>
      <main className="w-[90%] mx-auto shadow-xl text-center mt-8 flex flex-col gap-5">
        <div className="mb-5 text-2xl text-gray-400">
          اعطي الجوال لللاعب
          <p className="mt-8 text-4xl font-bold text-main-200">
            {currentUser.user}
          </p>
        </div>

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
            className="p-2 mx-auto bg-white rounded-full size-20"
            src={getImages(currentUser.rule)}
            alt={currentUser.rule}
          />

          <Conditonal condtion={like}>
            <img
              src={likeImage}
              className="p-2 mx-auto bg-white rounded-full size-1/4"
              alt="like"
            />
          </Conditonal>

          <Conditonal condtion={disLike}>
            <img
              src={disLikeImage}
              className="p-2 mx-auto bg-white rounded-full size-1/4"
              alt="like"
            />
          </Conditonal>

          <Conditonal condtion={gameRule.includes(currentUser.rule)}>
            <List
              users={users}
              rule={currentUser.rule}
              sendTo={(e) => {
                getChildData(e);
              }}
            />
          </Conditonal>
        </Conditonal>

        <Button
          className="mt-5"
          disabled={!isActive || !show}
          handleClick={handleClickSubmit}
          text="التالي"
        />
      </main>
    </div>
  );
}
