import './App.scss'
import Header from './components/Header/Header'
import Cube from './components/Cube/Cube'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

function App() {
  const isDark = useSelector(state => state.dark)

  return (
    <div className={classNames('App', (isDark) ? 'dark' : '')}>
      <Header />
      <Cube />
    </div>
  )
}

export default App
