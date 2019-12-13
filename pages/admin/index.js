import React, { useState } from 'react'
import uuid from 'uuid'
import Head from 'next/head'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import { Add as AddIcon, Create as CreateIcon } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { useFormik, Field } from 'formik';
const AdminPage = props => {

  const formik = useFormik({
    initialValues: {
      category: '',
      name: '',
      lessons: [],
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const bindField = name => ({
    name, onChange: formik.handleChange, value: formik.values[name]
  })

  const [formState, setFormState] = useState({
    category: '',
    name: ''
  })

  const [lessons, setLessons] = useState([])

  /* const addLesson = () =>
    setLessons(lessons => [...lessons, { id: uuid(), name: '' }]) */
  const addLesson = () =>
    formik.setFieldValue('lessons', [...formik.values.lessons, { id: uuid(), name: '' }])

  const editLesson = (id, override = {}) =>
    setLessons(lessons => lessons.map(lesson => lesson.id === id ? { ...lesson, ...override } : lesson))

  return (
    <div>
      <Head>
        <title>My page title</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Container maxWidth='md'>
        <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <Typography variant='h2' gutterBottom>Criar trilha</Typography>

          <Box m={2}>
            <TextField
              id="standard-basic" 
              label="Nomeie a trilha" 
              variant='filled'
              {...bindField('name')}
            />
          </Box>

          <Box m={2}>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="category">Selecione categoria</InputLabel>
              <Select {...bindField('category')}>
                <MenuItem value='drupal'>Drupal</MenuItem>
                <MenuItem value='react'>React</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box m={2}>
            {formik.values.lessons.map((lesson, index) => (
              <Box display="flex" alignItems="center" mb={2}>
                <Box mr={2}>
                  <Avatar>{index + 1}</Avatar>
                </Box>
                {console.log(formik)}
                <TextField
                  placeholder="Título da lição"
                  name={`lessons[${index}]`}
                  value={formik.values.lessons[index].name}
                  onChange={e => formik.setFieldValue(`lessons[${index}].name`, e.target.value)}
                />
                <CreateIcon />
              </Box>
            ))}

            <Fab
              variant="extended"
              color="primary"
              aria-label="add"
              onClick={() => addLesson()}
            >
              <AddIcon />
              Adicionar lição
          </Fab>
          </Box>
        </form>
      </Container>
      <pre>{JSON.stringify(formik.values, null, 2)}</pre>
    </div>
  )
}

export default AdminPage