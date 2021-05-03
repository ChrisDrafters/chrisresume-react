import './Project.scss'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import Cube from '../Cube/Cube'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { setPType } from '../../redux/actions'

const Project = () => {
    const isDark = useSelector(state => state.dark)
    const selectedProject = useSelector(state => state.project)
    const pType = useSelector(state => state.pType)
    const dispatch = useDispatch()

    const handleChange = (event, value) => {
        dispatch(setPType(value))
    };

    return (
        <div className={classNames('Project', (isDark) ? 'dark' : '')}>
            <div className="tabs">
                <Tabs indicatorColor="primary" value={pType} onChange={handleChange}>
                    <Tab label="Professional" value="professional" />
                    <Tab label="Personal" value="personal" />
                </Tabs>
            </div>
            <Cube />
            {(selectedProject != null && selectedProject.title != null) ?
                <div>
                    <div className={classNames('title', (isDark) ? 'dark' : '')}>
                        {selectedProject.title}
                    </div>
                    <div className={classNames('description', (isDark) ? 'dark' : '')}>
                        {selectedProject.description}
                    </div>
                    <div className={classNames('body', (isDark) ? 'dark' : '')}>
                        {selectedProject.body}
                    </div>
                    <div className="img1">
                        {
                            (selectedProject.img1 != null) ?
                                <img src={selectedProject.img1} className="img" alt="" />
                                :
                                <></>
                        }
                    </div>
                    <div className={classNames('body2', (isDark) ? 'dark' : '')}>
                        {selectedProject.body2}
                    </div>
                    <div className="img2">
                        {
                            (selectedProject.img2 != null) ?
                                <img src={selectedProject.img2} className="img" alt="" />
                                :
                                <></>
                        }
                    </div>
                </div>
                :
                <></>
            }
        </div>
    )
}

export default Project
