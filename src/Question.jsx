import React, { useState, useEffect } from "react";
import Answer from './Answer';

export default function Question(props) {

  const answerElements = props.answers.map((answer, i) => (
    <Answer
      key={props.id + '_' + i}
      id={props.id}
      answer={answer}
      correctAnswer={props.correctAnswer}
      submitted={props.submitted}
    />
  ))

  return (
      <div>
          <fieldset>
              <legend>{props.question}</legend>
              <span>{answerElements}</span>
          </fieldset>
      </div>
  )
}
