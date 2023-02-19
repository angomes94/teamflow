import React, { useState, useEffect } from 'react'
import { firestore } from 'firebase/app'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import {
    collectionGroup,
    query,
    where,
    doc,
    getDoc,
    getDocs
} from "firebase/firestore";
import { PROJECTS_COLLECTION, TASKS_COLLECTION } from '@/utils/constants';


export default function useFetchTasks() {
    const [loadingTasks, setLoadingTasks] = useState(true)
    const [errorTasks, setErrorTasks] = useState(null)
    const [tasks, setTasks] = useState([])

    const { currentUser } = useAuth()

    useEffect(() => {
        async function fetchData() {
            try {
                const projectsTasks = query(
                  collectionGroup(db, TASKS_COLLECTION),
                  where('assignedTo', '==', currentUser.email)
                );
                const querySnapshot = await getDocs(projectsTasks);
            
                const projects = {};
            
                await Promise.all(querySnapshot.docs.map(async (task) => {
                  const projectId = task.ref.parent.parent.id;
                  const docRef = doc(db, PROJECTS_COLLECTION, projectId);
                  const docSnap = await getDoc(docRef);
            
                  if (docSnap.data().isDeleted !== true) {
                    if (projects[projectId]) {
                      projects[projectId].tasks.push({
                        id: task.id,
                        title: task.data().title,
                        status: task.data().status
                      });
                    } else {
                      projects[projectId] = {
                        name: docSnap.data().name,
                        projectID: docSnap.id,
                        tasks: [{
                          id: task.id,
                          title: task.data().title,
                          status: task.data().status
                        }],
                      };
                    }
                  }
                }));
            
                setTasks(Object.values(projects));
              } catch (error) {
                setErrorTasks('Failed to load tasks');
              } finally {
                setLoadingTasks(false);
              }
              
        }
        fetchData()
    }, [])

    return { loadingTasks, errorTasks, tasks }
}