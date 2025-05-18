import { useState } from "react";
import { languages } from "../languages";
import clsx from "clsx";

function AssemblyEndgame() {
    const [curWord, setCurWord] = useState("react");
    const [guessedLetters, setGuessedLetters] = useState([]);

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    function addGuessedLetters(letter) {
        setGuessedLetters((prevLetters) =>
            prevLetters.includes(letter)
                ? prevLetters
                : [...prevLetters, letter]
        );
    }
    const languageElements = languages.map((lang) => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color,
        };
        return (
            <span key={lang.name} className="chip" style={styles}>
                {lang.name}
            </span>
        );
    });

    const letterElements = curWord.split("").map((letter, idx) => {
        const letterOnDisplay = guessedLetters.includes(letter)
            ? letter.toLocaleUpperCase()
            : "";
        return <span key={idx}>{letterOnDisplay}</span>;
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
                onClick={() => addGuessedLetters(letter)}
            >
                {letter.toUpperCase()}
            </button>
        );
    });

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>
                    Guess the word in under 8 attempts to keep the programming
                    world safe from Assembly!
                </p>
            </header>
            <section className="game-status">
                <h2>You win!</h2>
                <p>Well done!🎉</p>
            </section>
            <section className="language-chips">{languageElements}</section>
            <section className="word">{letterElements}</section>
            <section className="keyboard">{keyboardElements}</section>
            <button className="new-game">New Game</button>
        </main>
    );
}

export default AssemblyEndgame;
