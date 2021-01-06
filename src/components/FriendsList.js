import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';

import Icons from '../constants/Icons'
import InteractiveList from '../containers/InteractiveList'
import CustomTextField from '../containers/CustomTextField'
import friendList from '../mockData/friendList'
import Utils from '../util'
import AlertDialog from '../containers/AlertDialog'
import TitleWithSearchBar from './TitleWithSearchBar'

export default function FriendsList() {

  const classes = useStyles();
  const [state, setState] = React.useState({
    friendsList: [],
    searchedText: '',
    showSearchBox: false,
    newFriend: '',
    currentPage: 1,
    error: ' ',
    openDialog: false,
    message: "",
    handleOk: () => { },
    showCancel: false,
  });

  const toggleDialoge = () => {
    setState({ ...state, openDialog: !state.openDialog });
  };

  React.useEffect(() => {
    setState({
      ...state,
      friendsList: Utils.sortList(friendList)
    });
  }, []);

  const showDeleteWarning = (id, name) => {
    setState({
      ...state,
      openDialog: true,
      message: 'Are you sure you want to delete your friend ' + Utils.capitalizeName(name) + '.',
      showCancel: true,
      handleOk: () => { handleDelete(id) },
    });
  }

  const handleDelete = id => {
    let newList = state.friendsList.filter(friend => friend.id !== id);
    let currentPage = state.currentPage;

    if (state.currentPage > Math.ceil((newList.length) / 4)) {
      currentPage = Math.ceil((newList.length) / 4)
    }

    setState({
      ...state,
      currentPage: currentPage,
      friendsList: newList
    });
  }

  const toggleFavorite = (id) => {
    let newList = [...state.friendsList];
    
    let index = state.friendsList.findIndex(friend => friend.id === id);
    if(index > -1) newList[index] = { ...newList[index], favorite: !newList[index].favorite }

    setState({
      ...state,
      friendsList: Utils.sortList(newList),
    });
  }

  const handleNameChange = name => {
    let error = ' ';

    if (name.trim() !== '' && !/^[a-zA-Z ]*$/.test(name)) {
      error = 'Name can consists of alphabets only.'
    }

    setState({
      ...state,
      error: error,
      newFriend: name
    });
  }

  const handleAddNewFriend = () => {
    let error = ''
    if (state.newFriend.trim() === '') {
      error = 'Please enter a name.'
    } else if (state.newFriend.length < 3) {
      error = 'Name should be of atleast 3 characters'
    }

    if (error === '') {
      let newList = [...state.friendsList];
      newList.push({ id: Utils.generateID(), name: Utils.capitalizeName(state.newFriend), favorite: false });

      setState({
        ...state,
        newFriend: '',
        error: ' ',
        friendsList: Utils.sortList(newList),
        openDialog: true,
        message: 'Your friend ' + Utils.capitalizeName(state.newFriend) + ' added successfully.',
        showCancel: false
      });
    } else {
      setState({
        ...state,
        error: error
      });
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter' && state.error.trim() === '') {
      handleAddNewFriend();
    }
  }

  const handleSearch = (name) => {
    setState({
      ...state,
      searchedText: name,
    });
  }

  const handleClearSearch = () => {
    setState({
      ...state,
      searchedText: '',
      showSearchBox: false
    });
  }

  const handlePageChange = (event, value) => {
    setState({
      ...state,
      currentPage: value
    });
  };

  const handleEnableSearch = () => setState({ ...state, showSearchBox: true });

  let list = state.searchedText.trim() !== '' ? Utils.filterList(state.searchedText, state.friendsList) : state.friendsList,
    indexOfLastName = state.currentPage * 4,
    indexOfFirstName = indexOfLastName - 4,
    currentList = list.slice(indexOfFirstName, indexOfLastName),
    count = Math.ceil((list.length) / 4);

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <TitleWithSearchBar
          showSearchBox={state.showSearchBox}
          searchValue={state.searchedText}
          search={handleSearch}
          clearSearch={handleClearSearch}
          enableSearch={handleEnableSearch}
        />
        <CustomTextField
          name='addFriend'
          value={state.newFriend}
          onChange={handleNameChange}
          onKeyPress={handleEnter}
          placeholder="Enter your friend's name"
          endIcon={<Icons.AddIcon />}
          onEndIconClick={handleAddNewFriend}
          errorMsg={state.error}
        />
        <InteractiveList
          list={currentList}
          delete={showDeleteWarning}
          toggleFavorite={toggleFavorite}
        />
        {
          count > 1
          && <Pagination
            className={classes.pagination}
            count={count}
            color="primary"
            onChange={handlePageChange}
            page={state.currentPage}
          />
        }
      </Container>
      <AlertDialog
        toggleDialoge={toggleDialoge}
        open={state.openDialog}
        dialogeMessage={state.message}
        handleOk={state.handleOk}
        showCancel={state.showCancel}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '20px 0',
  },
  addButton: {
    color: '#1976d2',
  },
  pagination: {
    marginTop: '20px',
    '& .MuiPagination-ul': {
      justifyContent: 'center'
    }
  },
}));