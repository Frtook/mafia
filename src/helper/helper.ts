import { Person } from "./interfase";
export function getRondomArray(arr: string[]) {
  const arrRandom = Array(arr.length).fill(null);

  const randomValue: number[] = [];
  let i = 0;

  while (i < arr.length) {
    const randomNumber = Math.floor(Math.random() * arr.length);
    if (!randomValue.includes(randomNumber)) {
      arrRandom[randomNumber] = arr[i];
      randomValue.push(randomNumber);
      i++;
    }
  }

  return arrRandom;
}
export function getStructGame(users: string[], rules: string[]) {
  const myStruct: Person[] = [];
  for (let i = 0; i < users.length; i++) {
    myStruct.push({
      user: users[i],
      rule: rules[i],
      target: "",
      vote: "",
    });
  }
  return myStruct;
}

export function getRuleAR(rule: string) {
  if (rule === "mafia") return "مافيا";

  if (rule === "physician") return "طبيب";

  if (rule === "inspector") return "محقق";

  return "مواطن";
}

export function getMafi(game: Person[]) {
  let mafia = "";
  game.map((e) => {
    if (e.rule === "mafia") {
      mafia = e.user;
    }
  });
  return mafia;
}

export function whoIsDed(game: Person[]) {
  let mafiaValue = "";
  let physicianValue = "";

  game.map((e) => {
    if (e.rule === "mafia") {
      mafiaValue = e.target;
    }
    if (e.rule === "physician") {
      physicianValue = e.target;
    }
  });

  return mafiaValue === physicianValue ? "" : mafiaValue;
}

export function deleteUser(ded: string, game: Person[]): Person[] {
  const newGame = game.filter((e) => e.user != ded);
  return newGame;
}

export function getVoteName(game: Person[]): string {
  let names: { name: string; count: number }[] = [];
  game.map((e) => {
    names.push({ name: e.user, count: 0 });
  });
  for (let i = 0; i < names.length; i++) {
    let count = 0;
    game.map((e) => {
      if (e.vote === names[i].name) {
        count++;
      }
    });
    names[i].count = count;
  }
  names = names.sort((a, b) => b.count - a.count);

  if (names[0].count === names[1].count) {
    return "2";
  }
  return names[0].name;
}

export function getUsers(game: Person[]) {
  return game.map((e) => e.user);
}
