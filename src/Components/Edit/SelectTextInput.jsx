import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

export default function SelectTextInput(props) {
  const classes = useStyles();

  const handleChange =  (event) => props.getNewVal(event.target.value);

  return (
    <div className={classes.root}>
      <div style={{margin:' auto'}}>
        <TextField
          label="Enter new name"
          id="standard-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          value={props.newValue}
          onChange={handleChange}
          InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>,}}
        />
      </div>
    </div>
  );
}