import { connect } from "react-redux"
import Routes from './Routes/Routes'
import './App.css';

function App(props) {

  return (
    <div className="App">
      {console.log("Redux", props)}
      <Routes />
    </div>
  )
}

const mapStateToProps = (state) => ({
  name: state.api.name,
  users: state.api.users,
  posts: state.api.posts,
  comments: state.api.comments,
})

// const mapDispatchToProps = dispatch => {
// return {
//   set_Data: (counter) => dispatch(set_Data(counter)),
//   increment: (counter) => dispatch(inc_counter(counter)),
//   }
// }
export default connect(mapStateToProps)(App);
