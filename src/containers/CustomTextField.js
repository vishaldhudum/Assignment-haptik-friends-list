import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function CustomTextField(props) {
  const classes = defaultTheme();

  const handleChange = e => {
    props.onChange(e.target.value);
  }

  return (
    <div className={classes.root}>
      <TextField
        name={props.name}
        key={props.name}
        variant="outlined"
        size="small"
        value={props.value}
        margin="dense"
        onChange={handleChange}
        placeholder={props.placeholder}
        onKeyPress={props.onKeyPress}
        helperText={props.errorMsg}
        error={props.errorMsg !== undefined && props.errorMsg.trim() !== ''}
        InputProps={{
          endAdornment:
            <InputAdornment position="end">
              <IconButton
                onClick={props.onEndIconClick}
                size='small'
              >
                {props.endIcon}
              </IconButton>
            </InputAdornment>
        }}
      />
    </div>
  );
}

const defaultTheme = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: 0,
      // marginBottom: '10px',
      width: '100%',
      '& .MuiFormHelperText-contained': {
        margin: '0 5px'
      }
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline ': {
      border: '1px solid rgba(0, 0, 0, 0.23)',
    },
    '&:hover .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline ': {
      border: '1px solid rgba(0, 0, 0, 0.23)',
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: 'rgba(0, 0, 0, 0.54)'
    }
  },
}));