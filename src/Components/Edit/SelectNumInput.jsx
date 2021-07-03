import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
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
    width: '40ch',
  },
}));

export default function SelectNumInput(props) {
  const classes = useStyles();

  const isNumber = (str) => {
    if (parseInt(str)) { return true }
    else { return false };

  }

  const handleChange = (event) => {
    let val = event.target.value;
    if (isNumber(val)) { 
      const i = val.indexOf('.');
      val = val.slice(0, (i+3))
      props.getNewVal(val) 
    }
    else { props.getNewVal('') };
  }

  return (
    <div className={classes.root}>
      <div style={{ margin: ' auto' }}>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={props.newValue}
            onChange={handleChange}
            placeholder='X.XX'
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </div>
    </div>
  );
}