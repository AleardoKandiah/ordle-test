import { useContext } from "react";



// context provider
export type Accuracy =
    | "right" //Right letter and right position
    | "wrong" //Wrong letter
    | "almost" //Right letter and wrong position
    | "unknown" //Not evaluated

const getRandomCommonWord = () =>
    commonWordsArray[Math.floor(Math.random () * commonWordsArray.length)];

export const Game = () => {
    const { solutionWord, setSolutionWord} = useContext(SolutionWordContext)
}