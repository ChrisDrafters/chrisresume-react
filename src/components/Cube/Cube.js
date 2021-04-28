import slides from './slides'
import './Cube.scss'
import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { setProject } from '../../redux/actions'

const Cube = () => {

    const [curSlide, setCurSlide] = useState(0)
    const [inSlide, setInSlide] = useState(null)
    const [outSlide, setOutSlide] = useState(null)
    const [curAnim, setCurAnim] = useState(null)
    const isDark = useSelector(state => state.dark)
    const inSlideRef = useRef()
    const dispatch = useDispatch()
    inSlideRef.current = inSlide

    useEffect(() => {
        dispatch(setProject(slides[0]))
    }, [dispatch])

    const getClasses = (slide) => {
        if (curAnim === null) return '';
        if (curAnim === 'right') {
            if (inSlide === slide.id) {
                return 'inLeft';
            } else if (outSlide === slide.id) {
                return 'outLeft';
            } else return '';
        } else if (curAnim === 'left') {
            if (inSlide === slide.id) {
                return 'inRight';
            } else if (outSlide === slide.id) {
                return 'outRight';
            } else return '';
        } else return '';
    }

    const changeSlide = (anim) => {
        if (curAnim === null) {
            if (anim === 'left') {
                setOutSlide(curSlide)
                const next = curSlide === 0 ? slides.length - 1 : curSlide - 1
                setInSlide(next)
                setCurAnim(anim)
                dispatch(setProject(slides[next]))
            } else if (anim === 'right') {
                setOutSlide(curSlide)
                const next = curSlide === slides.length - 1 ? 0 : curSlide + 1
                setInSlide(next)
                setCurAnim(anim)
                dispatch(setProject(slides[next]))
            }
            setTimeout(() => {
                setCurSlide(inSlideRef.current)
                setCurAnim(null)
            }, 1000)
        }
    }

    return (
        <div className="slideContainer">
            <div className={classNames('arrow', (isDark) ? 'dark' : '')} onClick={changeSlide.bind(null, 'left')}><FaChevronLeft /></div>
            <div className="shadow"></div>
            {
                slides.map(slide => (
                    <div key={slide.id} className={classNames('slide', curSlide === slide.id && curAnim === null ? 'active' : '', getClasses(slide))}>{slide.title}</div>
                ))
            }
            <div className={classNames('arrow', (isDark) ? 'dark' : '')} onClick={changeSlide.bind(null, 'right')}><FaChevronRight /></div>
        </div>
    )
}

export default Cube
