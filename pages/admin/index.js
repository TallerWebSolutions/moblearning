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
import { useFormik } from 'formik';

const widgets = [
  {
    type: "text",
    label: "Texto",
    fields: {
      text: { type: "textarea", label: "Texto " },
      azeitona: { type: "text", label: "Azeitona" }
    },
  },  
  {
    type: "video",
    label: "Vídeo",
    fields: {
      video: { type: "text", label: "Video Url" }
    },
  }
];

const fields = {
  textarea: {
    defaultValue: '',
    component: ({ label, ...props }) => <TextField multiline label={label} {...props} />
  },
  text: {
    defaultValue: '',
    component: ({ label, ...props }) => <TextField label={label} {...props} />
  }
}

const WidgetButton = ({ label, ...props }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    {...props}
  >
    <Avatar>{label[0]}</Avatar>
    <Box>{label}</Box>
  </Box>
)

const AdminPage = props => {
  const formik = useFormik({
    initialValues: {
      category: '',
      name: '',
      lessons: [
        {
          "id": "0eea2b6e-dddf-43c8-b7ee-991d03651136",
          "name": "",
          "contents": []
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
  
  const [anchorEl, setAnchorEl] = useState(null)
  const [activeLessonId, setActiveLessonId] = useState("0eea2b6e-dddf-43c8-b7ee-991d03651136")
  const activeLesson = formik.values.lessons.find(lesson => lesson.id === activeLessonId)

  const [showWidgets, setShowWidgets] = useState(false)
  
  const addContent = (type, formik, activeLessonId) => () => {
    const widget = widgets.find(w => w.type === type)
    const index = formik.values.lessons.findIndex(l => l.id === activeLessonId)
  
    const contents = formik.values.lessons[index].contents
    const values = Object.keys(widget.fields).reduce((acc, fieldName) => ({
        ...acc,
        [fieldName]: fields[widget.fields[fieldName].type].defaultValue
    }), {})
    console.log(values)
    contents.push({ type: widget.type, values })

    formik.setFieldValue(`lessons[${index}].contents`, contents)
    setShowWidgets(false)
  }

  const addLesson = () =>
    formik.setFieldValue('lessons', [...formik.values.lessons, { id: uuid(), name: '', contents: [] }])

  const setActiveLessonFieldValue = (contentIndex, name, value) => {
    const index = formik.values.lessons.findIndex(l => l.id === activeLessonId)
    const content = formik.values.lessons[index].contents[contentIndex]
    formik.setFieldValue(`lessons[${index}].contents[${contentIndex}].values.${name}`, value)
  }

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
                      onClick={e => setActiveLessonId(lesson.id)}
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
              {activeLesson && (
                <div>
                  {activeLesson.contents.map((content, contentIndex) => {
                    const widget = widgets.find(w => w.type === content.type)
                    return (
                      <Box bgcolor="#ECECEC" p={2} display="flex" mb={2}>
                        <Box mr={1}>
                          <Avatar>{widget.label[0]}</Avatar>
                        </Box>
                        <Box>
                          {Object.keys(content.values).map(fieldName => {
                            const field = fields[widget.fields[fieldName].type]
                            const Component = field.component
                            return (
                              <Box mb={2} key={fieldName}>
                                <Component
                                  label={widget.fields[fieldName].label}
                                  value={content.values[fieldName]}
                                  onChange={e => setActiveLessonFieldValue(contentIndex, fieldName, e.target.value)}
                                />
                              </Box>
                            )
                          })}
                        </Box>
                      </Box>
                    )
                  })}

                  {showWidgets && (
                    <Box
                      mt={1}
                      p={3}
                      bgcolor="#ECECEC"
                      display="flex"
                      justifyContent="center"
                    >
                      {widgets.map(widget => (
                        <Box m={1}>
                          <WidgetButton
                            label={widget.label}
                            onClick={addContent(widget.type, formik, activeLesson.id)}
                          />
                        </Box>
                      ))}
                    </Box>
                  )}

                  {!showWidgets && (
                    <Box
                      border="1px dashed #CCC"
                      p={3}
                      display="flex"
                      justifyContent="center"
                    >
                      <Fab onClick={() => setShowWidgets(true)}><AddIcon /></Fab>
                    </Box>
                  )}

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