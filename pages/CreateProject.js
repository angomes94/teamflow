import ProjectAssign from '@/components/ProjectAssign'
import ProjectName from '@/components/ProjectName'
import ProjectTasks from '@/components/ProjectTasks'
import ProjectTeam from '@/components/ProjectTeam'
import React, {useState, useEffect} from 'react'

export default function CreateProject() {

    const [projectStep, setprojectStep] = useState("")

    const [projectName, setProjectName] = useState("")
    const [projectTeam, setProjectTeam] = useState([])
    const [projectTasks, setProjectTasks] = useState([])

    const createProjectsSteps = ["projectname", "projecttasks", "projectteam", "projectassign"]

    useEffect(() => {
        setprojectStep(createProjectsSteps[0])
    }, [])

    return (
    <> {
        projectStep === createProjectsSteps[0] && <ProjectName 
        setprojectStep={setprojectStep} setProjectName={setProjectName}/>
    } {
        projectStep === createProjectsSteps[1] && <ProjectTasks
                setprojectStep={setprojectStep}
                setProjectTasks={setProjectTasks}/>
    } {
        projectStep === createProjectsSteps[2] && <ProjectTeam 
        setprojectStep={setprojectStep} setProjectTeam={setProjectTeam}/>
    } {
        projectStep === createProjectsSteps[3] && <ProjectAssign
                setprojectStep={setprojectStep}
                projectName={projectName}
                projectTasks={projectTasks}
                setProjectTasks={setProjectTasks}
                projectTeam={projectTeam}/>
    } </>   
  )
}
