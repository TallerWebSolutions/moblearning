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
import { useState, useCallback } from "react"

const Quiz = ({ label, value, onChange }) => {
  const [formState, setFormState] = useState(value)

  const onChangeForm = choice => e => {
    console.log({ choice, e })
  }

  const onChangeQuestion = e => {
    console.log({ e })
  }

  const correctAnswer = value.answers.find(({ isCorrect }) => isCorrect)

  return (
    <FormControl component="fieldset">
      <TextField label={label} />
      <RadioGroup
        aria-label="answer"
        name="answer1"
        value={correctAnswer || correctAnswer.value}
        onChange={onChangeQuestion}
      >
        <FormControlLabel
          value="a"
          control={<Radio />}
          label={
            <TextField
              placeholder="Inserir uma resposta"
              onChange={onChangeForm("a")}
            />
          }
        />
        <FormControlLabel
          value="b"
          control={<Radio />}
          label={
            <TextField
              placeholder="Inserir uma resposta"
              onChange={onChangeForm("b")}
            />
          }
        />
        <FormControlLabel
          value="c"
          control={<Radio />}
          label={
            <TextField
              placeholder="Inserir uma resposta"
              onChange={onChangeForm("c")}
            />
          }
        />
        <FormControlLabel
          value="d"
          control={<Radio />}
          label={
            <TextField
              placeholder="Inserir uma resposta"
              onChange={onChangeForm("d")}
            />
          }
        />
      </RadioGroup>
    </FormControl>
  )
}

Quiz.metadata = {
  defaultValue: {
    question: null,
    answers: [{ text: null, isCorrect: false, value: null }]
  },
  component: Quiz
}

export default Quiz
