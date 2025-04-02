import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Dashboard userId="1" />} />
      </Switch>
    </Router>
  );
}

export default App;