import React, { useState } from 'react'
import Link from 'next/link'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Typography, styled } from '@material-ui/core'

const data = [
  {
    "name": "Introdução",
    'link': '/lesson/drupal-introduction'
  },
  {
    "name": "Como criar conteúdo",
  },
  {
    "name": "Introdução",
  }
]

const StyledPaper = styled(Paper)({
  marginTop: '100px',
  padding: '50px'
})

const StyledGrid = styled(Grid)({
  marginBottom: '40px',
})

const DrupalPage = props => {

  return (
    <Container maxWidth='xs'>
      <StyledPaper>
        <StyledGrid container spacing={4} justify='center' direction='column' align='center'>
          <Avatar>D</Avatar>
          <Typography>Drupal</Typography>
        </StyledGrid>
        { data.map(lesson => {
          return (
            <Link href={lesson.link}>
              <Typography gutterBottom>{ lesson.name }</Typography>
            </Link>
          )
        })}
      </StyledPaper>
    </Container>
  )
}

export default DrupalPage