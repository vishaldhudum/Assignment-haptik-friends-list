import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Icons from '../constants/Icons'
import CustomTextField from '../containers/CustomTextField'

export default function TitleWithSearchBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.titleWrapper}>
      <Typography variant="h6" className={classes.title}>
        Friends List
      </Typography>
      <div className={classes.searchWrapper}>
        {
          props.showSearchBox
            ? <CustomTextField
              name='addFriend'
              value={props.searchValue}
              onChange={props.search}
              placeholder="Search"
              endIcon={<Icons.CloseIcon />}
              onEndIconClick={props.clearSearch}
            />
            : <IconButton size='small' onClick={props.enableSearch}>
              <Icons.SearchIcon className={classes.searchButton} />
            </IconButton>
        }
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  titleWrapper: {
    display: 'flex',
    marginBottom: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    height: '40px'
  },
  title: {
    whiteSpace: 'nowrap',
    paddingRight: '10px'
  },
  searchButton: {
    color: 'grey'
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
}));