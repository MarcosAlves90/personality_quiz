import './App.css'
import Header from "./components/Header.jsx";
import {Route, Routes} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Question from "./components/Question.jsx";
import Results from "./components/Results.jsx";
import UserForm from "./components/UserForm.jsx";
import About from "./components/About.jsx";
import {UserContext} from "./components/UserContext.jsx";

function App() {

    const { currentQuestionIndex, setCurrentQuestionIndex } = useContext(UserContext);
    const { answers, setAnswers } = useContext(UserContext);
    const [breed, setBreed] = useState("");
    const [artwork, setArtwork] = useState(null);

    const dogBreeds = {
        "Labrador": 0,
        "Shihtzu": 0,
        "Pug": 0,
        "Germanshepherd": 0
    };

    const questions = [
        {
            question: "What's your favorite color?",
            options: {
                "Red 🔴": "Pug",
                "Blue 🔵": "Germanshepherd",
                "Green 🟢": "Shihtzu",
                "Yellow 🟡": "Labrador"
            }
        },
        {
            question: "What's your favorite season?",
            options: {
                "Summer ☀️": "Shihtzu",
                "Spring 🌸": "Pug",
                "Fall 🍂": "Germanshepherd",
                "Winter ❄️": "Labrador"
            }
        },
        {
            question: "What's your favorite animal?",
            options: {
                "Dog 🐕": "Labrador",
                "Cat 🐈": "Shihtzu",
                "Bird 🦜": "Pug",
                "Fish 🐟": "Germanshepherd"
            }
        },
        {
            question: "What's your favorite food?",
            options: {
                "Pizza 🍕": "Germanshepherd",
                "Salad 🥗": "Shihtzu",
                "Burger 🍔": "Labrador",
                "Sushi 🍣": "Pug"
            }
        }
    ];


    function handleAnswer(answer) {
        setAnswers([...answers, answer]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    function determineElement(answers) {

        for (let i = 0; i < answers.length; i++) {
            dogBreeds[questions[i].options[answers[i]]] += 1;
        }

        return Object.keys(dogBreeds).reduce((a, b) =>
            dogBreeds[a] > dogBreeds[b] ? a : b);
    }

    function Error(error) {
        throw new Error(error);
    }

    async function fetchArtwork(dogBreed) {
        try {
            const response = await fetch(`https://dog.ceo/api/breed/${dogBreed.toLowerCase()}/images/random`);
            if (!response.ok) {
                Error('Failed to fetch artwork');
            }
            const data = await response.json();
            setArtwork(data);
        } catch (error) {
            console.error('Failed to fetch artwork:', error);
        }
    }

    useEffect(

        function () {

            if (currentQuestionIndex === questions.length) {
                const selectedBreed = determineElement(answers);
                setBreed(selectedBreed);
                fetchArtwork(selectedBreed);
            }
        },

        [currentQuestionIndex]
    );

  return (
    <>
      <Header/>
        <Routes>
            <Route path="/" element={<UserForm />} />
            <Route
                path="/quiz"
                element={
                    currentQuestionIndex < questions.length  ? (
                        <Question question={questions[currentQuestionIndex].question} options={Object.keys((questions[currentQuestionIndex].options))} onAnswer={handleAnswer} />
                    ) : (
                        <Results element={breed} artwork={artwork} />
                    )
                }
            />
            <Route path="/personality_quiz/about" element={<About />} />
        </Routes>
    </>
  )
}

export default App
