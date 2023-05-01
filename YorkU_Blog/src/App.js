import Navbar from './NavBar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';

function App() {


  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>

            <Route path="/create">
              <Create></Create>
            </Route>
            <Route path="/blogs/:id">
              {/* :parameter_name represent the parameter. */}
              <BlogDetails></BlogDetails>
            </Route>

            {/* Must be the botton, other wise it gonna match any route that comes in  */}
            <Route path="*">
              <NotFound></NotFound>
            </Route>

          </Switch>

        </div>
      </div>

    </Router>

  );
}

export default App;
