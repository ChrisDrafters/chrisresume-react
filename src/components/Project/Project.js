import './Project.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Project = () => {
    const isDark = useSelector(state => state.dark)
    const selectedProject = useSelector(state => state.project)

    return (
        <div className="Project">
            {
                (selectedProject !== null) ?
                    <div>{selectedProject.title}</div>
                    :
                    <div>No Project Selected</div>
            }
        </div>
    )
}

export default Project
