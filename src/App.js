import './App.scss'
import Header from './components/Header/Header'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

function App() {
  const isDark = useSelector(state => state.dark)

  return (
    <div className={classNames('App', (isDark) ? 'dark' : '')}>
      <Header />
    </div>
  )
}

export default App
