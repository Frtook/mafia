import { Link, useLocation } from "react-router-dom";
import {
  getVoteName,
  deleteUser,
  whoIsDed,
  getMafi,
  getUsers,
} from "../helper/helper";
import Button from "../components/ui/Button";
import { useEffect, useState } from "react";
import Vote from "./Vote";

export default function Status() {
  const location = useLocation();
  const [gameStruct, setGameStruct] = useState(location.state.gameStruct);
  const ded = whoIsDed(gameStruct);
  const [vote, setVote] = useState(false);
  const [next, setNext] = useState(0);
  const [show, setShow] = useState(false);
  const [end, setEnd] = useState(false);
  const [voteName, setVoteName] = useState("");

  const currentUser = gameStruct[next] || {};

  function getChildData(data: string) {
    gameStruct[next].vote = data;
  }
  useEffect(() => {}, [gameStruct]);
  useEffect(() => {
    if (ded) {
      const mafia = getMafi(gameStruct);
      if (mafia === ded) {
        setEnd(true);
        setVoteName(mafia);
      }
    }
  }, [gameStruct, ded]);
  return (
    <div className="flex flex-col items-center justify-center gap-10 my-10">
      <Link to="/" className="self-start">
        <img
          src="/icons/home.svg"
          alt="home page"
          className="bg-main-200 p-2 size-[50px] rounded-2xl mr-5 mt-7 cursor-pointer"
        />
      </Link>

      {!vote && (
        <>
          {!end && (
            <p className="text-3xl lg:text-5xl text-main-100">
              {ded === "" ? "مفيش احد مات" : `اللاعب ${ded} مات`}
            </p>
          )}
          {!end && (
            <Button
              className=""
              text="تصويت"
              handleClick={() => setVote(true)}
            />
          )}
        </>
      )}
      {vote && (
        <>
          <>
            <p className="text-3xl text-main-200 lg:text-5xl">
              {currentUser.user}
            </p>
            {!show && <Button text="اظهار" handleClick={() => setShow(true)} />}
          </>

          {show && (
            <>
              <Vote
                game={gameStruct}
                sendTo={(e) => {
                  getChildData(e);
                }}
              />
              <Button
                text="التالي"
                handleClick={() => {
                  setNext((prev) =>
                    prev < gameStruct.length - 1 ? prev + 1 : prev
                  );
                  if (next === gameStruct.length - 1) {
                    const updatedVoteName = getVoteName(gameStruct);
                    setVoteName(updatedVoteName);
                    if (getMafi(gameStruct) === updatedVoteName) {
                      setVote(false);
                    } else {
                      const updatedGameStruct = deleteUser(
                        updatedVoteName,
                        gameStruct
                      );
                      setGameStruct(updatedGameStruct);
                    }
                    setEnd(true);
                    setVote(false);
                  }
                  setShow(false);
                }}
              />
            </>
          )}
        </>
      )}

      {end && voteName === "2" && (
        <>
          <span>تعادل</span>
          <Link
            to="/start"
            className="block p-2 mt-5 font-bold text-center text-white rounded-lg bg-main-200"
            state={{ game: gameStruct, users: getUsers(gameStruct) }}
          >
            رجوع
          </Link>
        </>
      )}
      {end && voteName != "2" && voteName && (
        <>
          {getMafi(gameStruct) === voteName ? (
            <span className="text-4xl">
              {" "}
              <span className="text-main-100">{voteName}</span> هو المافيا{" "}
            </span>
          ) : (
            <>
              <span className="text-4xl">
                <span className="text-main-100">{voteName}</span> مش هو المافيا{" "}
              </span>
              {gameStruct.length === 2 && (
                <span className="block mt-10 text-4xl text-center text-main-100">
                  فاز {getMafi(gameStruct)}
                </span>
              )}
              {gameStruct.length >= 3 && (
                <Link
                  to="/start"
                  className="block p-2 mt-5 font-bold text-center text-white rounded-lg bg-main-200"
                  state={{ game: gameStruct, users: getUsers(gameStruct) }}
                >
                  رجوع
                </Link>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
