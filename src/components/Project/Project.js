import './Project.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

const Project = () => {
    const isDark = useSelector(state => state.dark)
    const selectedProject = useSelector(state => state.project)

    return (
        <div className={classNames('Project', (isDark) ? 'dark' : '')}>
            {
                (selectedProject !== null) ?
                    <div>{selectedProject.description}</div>
                    :
                    <div>No Project Selected</div>
            }
        </div>
    )
}

export default Project
