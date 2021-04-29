import './App.scss'
import Header from './components/Header/Header'
import Cube from './components/Cube/Cube'
import Home from './components/Home/Home'
import Project from './components/Project/Project'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  const isDark = useSelector(state => state.dark)

  return (
    <Router>
      <div className={classNames('App', (isDark) ? 'dark' : '')}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/projects">
            <Cube />
            <Project />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
