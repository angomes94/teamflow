import React, { useState, useEffect } from 'react'
import { firestore } from 'firebase/app'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import {
    addDoc,
    where,
    query,
    doc,
    setDoc,
    getDoc,
    collection,
    onSnapshot,
    getDocs
} from 'firebase/firestore'
import { PROJECTS_COLLECTION, TASKS_COLLECTION, USERS_COLLECTION } from '@/utils/constants'

export default function useFetchCurrentProject() {

    const [selectedProjectName, setSelectedProjectName] = useState("")
    const [selectedProjectOwner, setSelectedProjectOwner] = useState("")
    const [selectedProjectTeam, setSelectedProjectTeam] = useState([])
    const [selectedProjectTasks, setSelectedProjectTasks] = useState([])
    const [selectedProjectID, setSelectedProjectID] = useState("")

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { currentUser } = useAuth()

    useEffect(() => {
        async function fetchData() {
            try {

                const docUsersRef = doc(db, USERS_COLLECTION, currentUser.uid);
                const docUsersSnap = await getDoc(docUsersRef);

                if (docUsersSnap.exists()) {

                    const projectid = (docUsersSnap.data().selectedProjectID)

                    const unsubProject = onSnapshot(doc(db, PROJECTS_COLLECTION, projectid), (docProject) => {

                        setSelectedProjectID(projectid)
                        setSelectedProjectName(docProject.data().name)
                        setSelectedProjectOwner(docProject.data().owner)
                        setSelectedProjectTeam(docProject.data().team)

                    });


                    const q = query(collection(db, PROJECTS_COLLECTION, projectid, TASKS_COLLECTION))

                    const unsubTasks = onSnapshot(q, (querySnapshot) => {

                        const tasks = [];
                        querySnapshot.forEach((docTask) => {
                            tasks.push({
                                id: docTask.id,
                                title: docTask.data().title,
                                status: docTask.data().status,
                                assignedTo: docTask.data().assignedTo
                            })
                        });
                        setSelectedProjectTasks([...tasks])
                    });
                }

            } catch (error) {
                setError('Failed to find document')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return {
        loading,
        error,
        selectedProjectID,
        selectedProjectName,
        selectedProjectOwner,
        selectedProjectTasks,
        selectedProjectTeam
    }
}
