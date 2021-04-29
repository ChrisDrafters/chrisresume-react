import './Header.scss'
import { useState, useEffect, useRef } from 'react'
import popSfx from '../../assets/pop.mp3'
import switchSfx from '../../assets/switch.mp3'
import useSound from 'use-sound'
import { useSelector, useDispatch } from 'react-redux'
import { setDark } from '../../redux/actions'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import { FaBars } from 'react-icons/fa'

function Header() {
    const isDark = useSelector(state => state.dark)
    const dispatch = useDispatch()
    const [pop, setPop] = useState(false)
    const [clickLamp, setClickLamp] = useState(false)
    const popRef = useRef()
    popRef.current = pop
    const [play] = useSound(popSfx, { volume: 0.5 })
    const [playSwitch] = useSound(switchSfx, { volume: 0.5 })
    const location = useLocation()
    const [openDrawer, setOpenDrawer] = useState(false)

    useEffect(() => {
        document.addEventListener('click', () => {
            setPop(true)
            play()
        }, { once: true })
    }, [play])

    const triggerLamp = () => {
        playSwitch()
        setClickLamp(true)
        setTimeout(() => {
            dispatch(setDark(!isDark))
        }, 250)
        setTimeout(() => {
            setClickLamp(false)
        }, 1000);
    }

    const openMenu = () => {
        setOpenDrawer(true)
    }

    const closeMenu = () => {
        setOpenDrawer(false)
    }

    return (
        <div className={classNames('Header', (isDark) ? 'dark' : '')}>
            <Drawer classes={{ paperAnchorLeft: classNames('soContainer', (isDark) ? 'dark' : '') }} anchor="left" open={openDrawer} onClose={closeMenu}>
                <div className="slideOutMenu">
                    <Link to="/" className={classNames(location.pathname === '/' ? 'active' : '', 'items', isDark ? 'dark' : '')}>Home</Link>
                    <Link to="/projects" className={classNames(location.pathname === '/projects' ? 'active' : '', 'items', isDark ? 'dark' : '')}>Projects</Link>
                </div>
            </Drawer>
            <div className="content">
                <div className="menu" onClick={openMenu}>
                    <FaBars />
                </div>
                <div className="logo">
                    <div className="left">
                        <div className="top">Chris</div>
                        <div className="bottom">Resume</div>
                    </div>
                    <div className="right">
                        <div className="comContainer">
                            {
                                (pop) ?
                                    <>
                                        <div className="comBackground"></div>
                                        <div className="comForeground">.com</div>
                                    </>
                                    : <></>
                            }
                        </div>
                    </div>
                </div>
                <div className="nav">
                    <Link to="/" className={classNames(location.pathname === '/' ? 'active' : '', 'items', isDark ? 'dark' : '')}>Home</Link>
                    <Link to="/projects" className={classNames(location.pathname === '/projects' ? 'active' : '', 'items', isDark ? 'dark' : '')}>Projects</Link>
                </div>
                <div className={classNames('chain', (clickLamp) ? 'click' : '')} onClick={triggerLamp}></div>
            </div>
        </div >
    )
}



export default Header
