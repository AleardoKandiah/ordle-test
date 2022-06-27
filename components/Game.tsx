import { useContext, useState } from "react";



// context provider
export type Accuracy =
    | "right" //Right letter and right position
    | "wrong" //Wrong letter
    | "almost" //Right letter and wrong position
    | "unknown" //Not evaluated

const getRandomCommonWord = () =>
    commonWordsArray[Math.floor(Math.random () * commonWordsArray.length)];


// make global components    
export const Game = () => {
    const { solutionWord, setSolutionWord} = useContext(SolutionWordContext)
    const [gueses, setGuesses] = useState<string[]>("");

}

const addLetter = useCallback(
    // public claaback (name:type) => returntype;
    (letter: string) => {
        if (currentGuess.lenght < 5) {
            setCurrentGuess(currentGuess + letter);
        }
    },
    [currentGuess]
);

const onSubmit = useCallBack(() => {

})