import React, { useState, useEffect } from "react"
import Question from "./Question"
import { nanoid } from "nanoid"

export default function App() {
    const [quizStarted, setQuizStarted] = useState(false)
    const [questions, setQuestions] = useState([])
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10")
            .then(response => response.json())
            .then(data => {
              setQuestions(data.results.map(question => {
                const allAnswers = [...question.incorrect_answers, question.correct_answer].sort((a, b) => 0.5 - Math.random());
                return {id: nanoid(), ...question, answers: allAnswers}
            }))})
    }, [])

    function submitAnswers(event) {
        event.preventDefault()
        setSubmitted(prev => !prev)
    }

    function refreshPage(event) {
        event.preventDefault()
        window.location.reload(false);
    }

    const questionElements = questions.map((question, i) => (
      <Question
        key={question.id}
        question={question.question}
        answers={question.answers}
        id={question.id}
        submitted={submitted}
        correctAnswer={question.correct_answer}
      />
    ))

    return (
        <>
            {quizStarted ?
            <div className="main">
                <div>
                    <h1>Questions</h1>
                    {<form onSubmit={submitAnswers}>
                      {questionElements}
                      {submitted ?
                        <button className="btn-small" onClick={refreshPage}>Play again</button> :
                        <button className="btn-small">Check answers</button>
                      }
                    </form>}
                </div>
            </div> :
            <div className="welcome">
                <div>
                    <h1>Quizzical</h1>
                    <p>Some longer text here as description</p>
                    <button onClick={() => setQuizStarted(prev => !prev)}>Start quiz</button>
                </div>
            </div>}
        </>
    )
}
