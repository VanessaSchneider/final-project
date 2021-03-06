import React, { useState, useEffect } from "react";
import leprechaun from "./leprechaun.png";
import { NavLink } from "react-router-dom";
import WordContainer from "./WordContainer.js";

function Game3() {
  const [words, setWords] = useState([]);
  const [user, setUser] = useState("");
  const [letters, setLetters] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [finalCorrect, setFinalCorrect] = useState([]);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((data) => setUser(data));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/getWords")
      .then((res) => res.json())
      .then((data) => setWords(data));
  }, []);

  useEffect(() => {
    fetch("/getLetters")
      .then((res) => res.json())
      .then((data) => setLetters(data));
  }, []);

  useEffect(() => {
    fetch("/getWords")
      .then((res) => res.json())
      .then((data) => setWords(data));
  }, [finalCorrect]);

  function updateLetter(updatedWord) {
    if (updatedWord)
      updatedWord.letters.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
  }

  return (
    <div>
      <WordContainer
        setLetters={setLetters}
        words={words}
        letters={letters}
        finalCorrect={finalCorrect}
        user={user}
        updateLetter={updateLetter}
        setFinalCorrect={setFinalCorrect}
      />
    </div>
  );
}

export default Game3;
