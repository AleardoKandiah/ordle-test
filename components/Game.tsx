import { setgid } from "process";
import { useCallback, useContext, useEffect, useState } from "react";



// context provider
export type Accuracy =
    | "right" //Right letter, right position
    | "wrong" //Wrong letter
    | "almost" //Right letter, wrong position
    | "unknown" //Not evaluated

const getRandomCommonWord = () =>
    commonWordsArray[Math.floor(Math.random () * commonWordsArray.length)];


// make global components    
export const Game = () => {
    const { solutionWord, setSolutionWord} = useContext(SolutionWordContext)
    const [gueses, setGuesses] = useState<string[]>("");



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
        if(currentGuess.length === 5) {
            if(allWordsSet.has(currentGuess)) {
                const accuracies = evaluate(currentGuess, solutionWord);

                // Check for win/loss
                if (accuracies.every((accuracy) => accuracy === "right")) {
                    setGameState("win");
                } else if (guesses.length === 5) {
                    setGameState("lose");
                }

                // Figure out which keyboard keys need update their colors
                let newGuessedLetters = [...guessedLetters];
                for (let i = 0; i < currentGuess.length; i++) {
                    const isKeyRight = accuracies[i] === "right";
                    const isKeyAlmost = 
                    accuracies[i] === "almost" &&
                    // Not previously guessed right
                    !newGuessedLetters.some(
                        (letter) =>
                            letter.value === currentGuess[i] && letter.accuracy === "right"
                    );
                    const isKsyWrong=
                    accuracies[i] === "wrong" &&
                    // Not previously guessed
                    !guessedLetters.some((letter) => letter.value === currentGuess[i]);

                    if (isKeyRight || isKeyAlmost) {
                        // remove the existing letter if it exists
                        newGuessedLetters = newGuessedLetters.filter(
                            (letter) => letter.value !== currentGuess[i]
                        );

                        newGuessedLetters.push({
                            value: currentGuess[i],
                            accuracy: isKeyRight ? "right" : "almost",
                        });
                    } else if(isKeyWrong) {
                        newGuessedLetters.push({
                            value: currentGuess[i],
                            accuracy: "wrong",
                        });
                    }
                }
                // Update key colors
                setGuessLetters(newGuessedLetters);

                // record and reset guess
                setGuesses([...newGuessedLetters, currentGuess]);
                setCurrentGuess("");
            }   else {
                alert("Not a word!")
            }
        }
    }, [currentGuess, guessedLetters, guesses, solutionWord]);

    // add delete letter on backspace
    const onBackspace = useCallback(() => {
        if (currentGuess.length > 0) {
            setCurrentGuess(currentGuess.slice(0,-1));
        }
    }, [currentGuess]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const {key, metaKey, shiftKey, ctrlkey, altKey, isComposing} = events;

            // ignore the key combination and inputs
            if( metaKey || shiftKey || ctrlkey || altKey || isComposing) {
                return;
            }

            if (key.length === 1 && key.match(/[a-z]/i)) {
                addLetter(key);
            } else if (key === "Enter") {
                onSubmit();
            } else if (key === "Backspace") {
                onBackspace();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [addLetter, onBackspace, onSubmit]);

    return (
        <div>
            <div>
                {guesses.map((guess, i) => (
                    <WordRow guessWord={guess} key={i} />
                ))}
            </div>
        </div>
    )
}