import React, { useState } from 'react'
import { Typography, styled } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'

const data = {
  "category": "drupal",
  "name": "Drupal",
  "lessons": [
    {
      "id": "0eea2b6e-dddf-43c8-b7ee-991d03651136",
      "name": "Como ligar",
      "contents": [
        {
          "type": "text",
          "values": {
            "text": "Aperta o botão on"
          }
        },
        {
          "type": "video",
          "values": {
            "video": "http://youtube/drupal"
          }
        }
      ]
    },
    {
      "id": "bc41d510-dd31-48b8-aedd-94877e9442fb",
      "name": "Como desligar",
      "contents": [
        {
          "type": "text",
          "values": {
            "text": "Aperta o botão desligar"
          }
        }
      ]
    }
  ]
}

const DrupalPage = props => {
  const [activeStep, setActiveStep] = React.useState(0)
  
  const lessons = data.lessons
  return (
    <div>
      <Typography>Drupal 101</Typography>
      <Typography>Categoria: Drupal</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {lessons.map(lesson => (
          <Step>
            <StepLabel>{lesson.name}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* <ul>
      </ul> */}
    </div>
  )
}

export default DrupalPage