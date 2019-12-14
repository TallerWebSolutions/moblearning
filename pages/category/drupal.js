import React, { useState } from 'react'
import { Typography, styled } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

import widgets from '../../src/widgets'

const data = {
  "category": "drupal",
  "name": "Drupal",
  "lessons": [
    {
      "id": "0eea2b6e-dddf-43c8-b7ee-991d03651136",
      "name": "Introdução",
      "contents": [
        {
          "type": "text",
          "values": {
            "text": "Texto sobre uma leve introdução seguido por um vídeo"
          }
        },
        {
          "type": "video",
          "values": {
            "video": "https://www.youtube.com/watch?v=-DYSucV1_9w"
          }
        }
      ]
    },
    {
      "id": "bc41d510-dd31-48b8-aedd-94877e9442fb",
      "name": "Como criar um tipo de conteúdo",
      "contents": [
        {
          "type": "text",
          "values": {
            "text": "Lorem Ipsum"
          }
        }
      ]
    },
    {
      "id": "bc41d510-dd31-48b8-aedd-sdfadfas",
      "name": "Como fazer dinheiro",
      "contents": [
        {
          "type": "text",
          "values": {
            "text": "Venda"
          }
        }
      ]
    }
  ]
}

const DrupalPage = props => {
  const [activeStep, setActiveStep] = React.useState(0)
  
  const activeContent = data.lessons[activeStep]
  const lessons = data.lessons

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography>Drupal 101</Typography>
          <Typography>Categoria: Drupal</Typography>
          <Stepper activeStep={activeStep} orientation="vertical">
            {lessons.map((lesson, index) => (
              <Step onClick={e => setActiveStep(index)}>
                <StepLabel>{lesson.name}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={9}>
          <Typography variant='h3' gutterBottom>{activeContent.name}</Typography>
          {activeContent.contents.map(content => {
            const widget = widgets.find(w => w.type === content.type)
            const Component = widget.component
            return <Component values={content.values} />
          })}
        </Grid>
      </Grid>
    </div>
  )
}

export default DrupalPage