import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));

export default function MultilineTextFields(props) {
  const classes = useStyles();

  const handleChange = (event) =>  props.selectVal(event.target.value)

  return (

    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-select-currency"
          select
          label="Select"
          value={props.selectValue}
          onChange={handleChange}
          helperText="Please select a value to change"
        >
          {props.select
            ? props.select.map((option) => (
              <MenuItem key={`${option.value.id} ${option.value.col}`} value={option.value}>
                {option.label}
              </MenuItem>
            ))
            : 'loading..'}
        </TextField>
      </div>
    </form>
  );
}