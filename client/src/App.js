import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Menubar from './components/Menubar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import AuthRoute from './utils/AuthRoute';

import { AuthContextProvider } from './context/auth';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Container>
          <Menubar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Container>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
