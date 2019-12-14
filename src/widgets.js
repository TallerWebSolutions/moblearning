import ReactYoutube from 'react-youtube'
import getYoutubeId from 'get-youtube-id'
import { Typography } from '@material-ui/core'
const widgets = [
  {
    type: "text",
    label: "Texto",
    fields: {
      text: { type: "textarea", label: "Texto " }
    },
    component: ({ values }) => (
      <Typography>{values.text}</Typography>
    )
  },  
  {
    type: "video",
    label: "Vídeo",
    fields: {
      video: { type: "text", label: "Video Url" }
    },
    component: ({ values }) => (
      <div><ReactYoutube videoId={getYoutubeId(values.video)} /></div>
    )
  }
];

export default widgets