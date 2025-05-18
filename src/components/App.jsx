import { useState } from "react";
import { languages } from "../lib/languages";
import { getFarewellText, getRandomWord } from "../lib/utils";
import clsx from "clsx";
import ReactConfetti from "react-confetti";

function AssemblyEndgame() {
    // state values
    const [curWord, setCurWord] = useState(() => getRandomWord());
    const [guessedLetters, setGuessedLetters] = useState([]);

    // derived values
    const wrongGuessCount = guessedLetters.reduce(
        (acc, letter) =>
            guessedLetters.includes(letter) && !curWord.includes(letter)
                ? acc + 1
                : acc,
        0
    );
    const isGameWon = curWord
        .split("")
        .every((letter) => guessedLetters.includes(letter));
    const isGameLost = wrongGuessCount >= languages.length - 1;
    const isGameOver = isGameWon || isGameLost;
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
    const isLastGuessIncorrect =
        lastGuessedLetter && !curWord.includes(lastGuessedLetter);

    // static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    function addGuessedLetters(letter) {
        setGuessedLetters((prevLetters) =>
            prevLetters.includes(letter)
                ? prevLetters
                : [...prevLetters, letter]
        );
    }
    const languageElements = languages.map((lang, idx) => {
        const isLanguageLost = idx < wrongGuessCount;
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color,
        };
        const className = clsx("chip", isLanguageLost && "lost");
        return (
            <span key={lang.name} className={className} style={styles}>
                {lang.name}
            </span>
        );
    });

    const letterElements = curWord.split("").map((letter, index) => {
        const shouldRevealLetter =
            isGameLost || guessedLetters.includes(letter);
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        );
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        );
    });

    const keyboardElements = alphabet.split("").map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = isGuessed && curWord.includes(letter);
        const isWrong = isGuessed && !curWord.includes(letter);
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong,
        });

        return (
            <button
                className={className}
                key={letter}
                disabled={isGameOver}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
                onClick={() => addGuessedLetters(letter)}
            >
                {letter.toUpperCase()}
            </button>
        );
    });

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect,
    });

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p className="farewell-message">
                    {getFarewellText(languages[wrongGuessCount - 1].name)}
                </p>
            );
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            );
        }
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            );
        }

        return null;
    }

    function resetGame() {
        setCurWord(getRandomWord());
        setGuessedLetters([]);
    }

    return (
        <main>
            {isGameWon && (
                <ReactConfetti recycle={false} numberOfPieces={1000} />
            )}
            <header>
                <h1>Assembly: Endgame</h1>
                <p>
                    Guess the word in under 8 attempts to keep the programming
                    world safe from Assembly!
                </p>
            </header>
            <section
                aria-live="polite"
                role="status"
                className={gameStatusClass}
            >
                {renderGameStatus()}
            </section>
            <section className="language-chips">{languageElements}</section>
            <section className="word">{letterElements}</section>
            <section className="keyboard">{keyboardElements}</section>
            {isGameOver && (
                <button className="new-game" onClick={resetGame}>
                    New Game
                </button>
            )}
        </main>
    );
}

export default AssemblyEndgame;
