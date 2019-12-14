import React, { useRef, useState } from "react"
import ReactYoutube from "react-youtube"
import getYoutubeId from "get-youtube-id"
import { Typography } from "@material-ui/core"
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
const widgets = [
  {
    type: "text",
    label: "Texto",
    fields: {
      text: { type: "textarea", label: "Texto " }
    },
    component: ({ values }) => <Typography>{values.text}</Typography>
  },
  {
    type: "video",
    label: "Vídeo",
    fields: {
      video: { type: "text", label: "Video Url" }
    },
    component: ({ values }) => {
      const ytRef = useRef(null)

      return (
        <div>
          <ReactYoutube
            ref={ytRef}
            videoId={getYoutubeId(values.video)}
            onStateChange={console.log}
          />
        </div>
      )
    }
  },
  {
    type: "quiz",
    label: "Quiz",
    fields: {
      quiz: { type: "quiz", label: "Insira sua pergunta" }
    },
    component: ({ values: { quiz } }) => {
      console.log(quiz)
      const [value, setValue] = useState(null) 

      return (
        <FormControl component="fieldset">
          <FormLabel component="legend">{quiz.question}</FormLabel>
          <RadioGroup name="question1" value={value} onChange={e => setValue(e.target.value)}>
            {quiz.answers.map(answer => {
              return <FormControlLabel value={answer.value} control={<Radio />} label={answer.text} />

            })}
          </RadioGroup>
          { value === quiz.correctAnswer && (
            <Typography>Acertou</Typography>
          )}
      </FormControl>
      )
    }
  }
]

export default widgets
