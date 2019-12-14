import {
  Box,
  Grid,
  Radio,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core"
import { useFormik } from "formik"
import { useState, useEffect } from "react"

const Quiz = ({ label, value, onChange }) => {
  const [formState, setFormState] = useState(value)

  useEffect(() => {
    onChange(formState)
  }, [formState])

  const setState = (override) => {
    setFormState(s => ({ ...s, ...override }))
  }

  const bindForm = (name) => ({
    onChange: e => {
      setState({ [name]: e.target.value })
    },
    value: formState[name]
  })

  const setAnswerState = (answerIndex, override, cb) => {
    setFormState(s => ({
      ...s,
      answers: s.answers.map((answer, index) => (
        answerIndex === index ? { ...answer, ...override } : answer
      ))
    }))
  }

  return (
    <>
      <FormControl component="fieldset">
        <TextField label={label} {...bindForm('question')} />
        <RadioGroup
          onChange={e => setState({ correctAnswer: e.target.value })}
          value={formState.correctAnswer}
        >
          {formState.answers.map((answer, index) => (
            <FormControlLabel
              value={answer.value}
              control={<Radio />}
              label={
                <TextField
                  placeholder="Inserir uma resposta"
                  value={answer.text}
                  onChange={e => setAnswerState(index, { text: e.target.value })}
                />
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
    </>
  )
}

Quiz.metadata = {
  defaultValue: {
    question: null,
    correctAnswer: null,
    answers: [
      { text: null, value: 'a' },
      { text: null, value: 'b' },
      { text: null, value: 'c' },
      { text: null, value: 'd' },
    ]
  },
  component: Quiz
}

export default Quiz
