import FriendsList from '../components/FriendsList';
import AppBar from '../containers/AppBar'

function App() {
  return (
    <div className='appWrapper'>
      <AppBar/>
      <FriendsList/>
    </div>
  );
}

export default App;
