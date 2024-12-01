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
import { Person } from "../helper/interfase";

export default function Status() {
  const location = useLocation();
  const [gameStruct, setGameStruct] = useState(location.state.gameStruct);
  const ded = whoIsDed(gameStruct);
  const [vote, setVote] = useState(false);
  const [next, setNext] = useState(0);
  const [show, setShow] = useState(false);
  const [voteName, setVoteName] = useState("");
  const currentUser = gameStruct[next] || {};

  useEffect(() => {
    if (ded) {
      setGameStruct((prev: Person[]) => deleteUser(ded, prev));
    }
  }, [ded]);
  function getChildData(data: string) {
    gameStruct[next].vote = data;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 my-32">
      <Link to="/" className="self-start">
        <img
          src="/icons/home.svg"
          alt="home page"
          className="bg-main-200 p-2 size-[50px] rounded-2xl mr-5 mt-7 cursor-pointer"
        />
      </Link>

      {!vote && (
        <>
          <p className="text-3xl lg:text-5xl text-main-100">
            {ded === "" ? "مفيش احد مات" : `اللاعب ${ded} مات`}
          </p>
          <Button className="" text="تصويت" handleClick={() => setVote(true)} />
        </>
      )}
      {vote && (
        <>
          {voteName.length === 0 && (
            <>
              <p className="text-3xl text-main-200 lg:text-5xl">
                {currentUser.user}
              </p>
              <Button text="اظهار" handleClick={() => setShow(true)} />
            </>
          )}
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
                    if (getMafi(gameStruct) === voteName) {
                      setVote(false);
                    }
                    const updatedGameStruct = deleteUser(
                      updatedVoteName,
                      gameStruct
                    );
                    setGameStruct(updatedGameStruct);
                  }
                  setShow(false);
                }}
              />
            </>
          )}
        </>
      )}
      {voteName && (
        <span>
          {getMafi(gameStruct) === voteName ? (
            `${voteName} هو المافيا `
          ) : (
            <>
              <span className="text-3xl"> {voteName} مش هو المافيا </span>
              {gameStruct.length === 3 && (
                <span className="block mt-10 text-4xl text-center text-main-100">
                  فاز {getMafi(gameStruct)}
                </span>
              )}
              {gameStruct.length > 3 && (
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
        </span>
      )}
    </div>
  );
}
