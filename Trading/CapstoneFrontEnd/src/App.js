import Signals from './Components/Signals'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Signals />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
