import React, { useState } from 'react'
import uuid from 'uuid'
import Head from 'next/head'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
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
import Menu from "@material-ui/core/Menu";

const widgets = [
  {
    name: "text",
    label: "Texto",
    component: props => <h1>Text</h1>
  }
];

const AdminPage = props => {

  const formik = useFormik({
    initialValues: {
      category: '',
      name: '',
      // lessons: [],
      lessons: [
        {
          "id": "0eea2b6e-dddf-43c8-b7ee-991d03651136",
          "name": "",
          "fields": []
        }
      ],
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
  
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [lessons, setLessons] = useState([])
  const [menuState, handleMenuState] = useState(false);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = event => {
    setAnchorEl(null)
  }
  
  const addField = (name, formik, activeLesson) => () => {
    const widget = widgets.find(w => w.name === name)
    const index = formik.values.lessons.findIndex(l => l.id === activeLesson.id)
    const fields = formik.values.lessons[index].fields
    fields.push(widget)
    formik.setFieldValue(`lessons[${index}].fields`, fields)
    // setContents(c => [...c, { widget, id: uuid(), state: {} }]);
    // handleMenuState(false);
  }

  const addLesson = () =>
    formik.setFieldValue('lessons', [...formik.values.lessons, { id: uuid(), name: '', fields: [] }])

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
          <Grid container spacing={3}>
            <Grid item xs={6}>
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
                    <TextField
                      placeholder="Título da lição"
                      name={`lessons[${index}]`}
                      value={formik.values.lessons[index].name}
                      onChange={e => formik.setFieldValue(`lessons[${index}].name`, e.target.value)}
                    />
                    <CreateIcon
                      onClick={e => setActiveLesson(formik.values.lessons[index])}
                    />
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
            </Grid>
            <Grid item xs={6}>
              { activeLesson && (
                <div>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleMenu}
                  >
                    Open Menu
                  </Button>
                  <Menu
                    id="simple-menu"
                    keepMounted
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    {widgets.map(widget => (
                      <MenuItem value={widget.name} onClick={addField(widget.name, formik, activeLesson )}>
                        {widget.label}
                      </MenuItem>
                    ))}
                  </Menu>
                  {activeLesson.fields.map(field => (
                    <h1>{field.label}</h1>
                  ))}
                </div>
              )}
            </Grid>
          </Grid>
        </form>
      </Container>
      <pre>{JSON.stringify(formik.values, null, 2)}</pre>
    </div>
  )
}

export default AdminPage