import { useState } from "react";
import { languages } from "../languages";

function AssemblyEndgame() {
    const [curWord, setCurWord] = useState("react");

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

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

    const letterElements = curWord
        .split("")
        .map((letter, idx) => (
            <span key={idx}>{letter.toLocaleUpperCase()}</span>
        ));

    const keyboardElements = alphabet
        .split("")
        .map((letter) => <button key={letter}>{letter.toUpperCase()}</button>);

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
