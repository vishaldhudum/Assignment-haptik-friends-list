import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import Icons from '../constants/Icons'

export default function InteractiveList(props) {
  
  const classes = useStyles();

  return (
    <React.Fragment>
      <List className={classes.list}>
      {
        props.list.map((friend) =>
            <ListItem className={classes.listItem} key={friend.id}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <Icons.FaceIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={friend.name}
                secondary={'Is your friend'}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => props.toggleFavorite(friend.id)}
                >
                  {
                    friend.favorite
                    ? <Icons.StarIcon className={classes.starIcon} />
                    : <Icons.StarBorderIcon className={classes.starIcon} />
                  }
                </IconButton>
                <IconButton onClick={() => props.delete(friend.id, friend.name)}>
                  <Icons.DeleteIcon className={classes.deleteIcon}/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
        )
      }
      {
        props.list.length === 0 && "No Friends"
      }
      </List>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  list:{
    height: '320px'
  },
  listItem: {
    backgroundColor: 'white',
    marginBottom: '10px',
    padding: '5px 10px',
    '& .MuiListItemText-primary':{
      fontWeight: 'bold'
    }
  },
  starIcon:{
    color: '#0066e5'
  },
  deleteIcon: {
    color: '#e23232'
  },
  avatar: {
    background: '#3066b0'
  }
}));