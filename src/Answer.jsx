import React, { useState } from "react";

export default function Question(props) {
  const [selected, setSelected] = useState(false);

  const selectAnswer = () => {
    setSelected(prev => !prev)
  }

  const rightAnswer = props.correctAnswer === props.answer;

  return (
    <span>
      <input
        type="radio"
        id={`${props.answer}-${props.id}`}
        value={props.answer}
        onClick={selectAnswer}
      />
      <label
        htmlFor={`${props.answer}-${props.id}`}
        className={`
          ${props.submitted && rightAnswer && 'right-answer'}
          ${props.submitted && !rightAnswer && selected && 'wrong-answer'}
          ${selected && 'selected'}
        `}
      >
          {props.answer}
      </label>
    </span>
  )
}
