import React from "react";
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
export default function AlertComponent  (props){
return  <Alert severity="error">{props.message}</Alert>
}