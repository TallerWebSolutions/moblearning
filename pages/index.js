import Link from 'next/link'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import { Typography, styled } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'

const PaperStyled = styled(Paper)({
  padding: '1rem'
})

const Index = () => {
  return (
    <Container maxWidth='xs'>
      <Grid container spacing={3}>
      <Typography variant="h3" component='h1' gutterBottom>Escolha a categoria</Typography>
        <Grid item xs={6}>
          <Link href='/category/drupal'>
            <PaperStyled elevation={2} p='1rem'>
              <Grid container spacing={4} justify='center' direction='column' align='center'>
                <Avatar>D</Avatar>
                <Typography>Drupal</Typography>
              </Grid>
            </PaperStyled>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link href='/categoryreact'>
            <PaperStyled elevation={2}>
              <Grid container spacing={4} justify='center' direction='column' align='center'>
                <Avatar>R</Avatar>
                <Typography>React</Typography>
              </Grid>
            </PaperStyled>
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Index
