import React, { useState, useEffect } from 'react'
import { firestore } from 'firebase/app'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { addDoc, where, query, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore'
import { PROJECTS_COLLECTION } from '@/utils/constants'


export default function useFetchProjects() {
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [errorProjects, setErrorProjects] = useState(null)
  const [projects, setProjects] = useState([])

  const { currentUser } = useAuth()

  useEffect(() => {
    async function fetchData() {
        try {
            const q = query(
                collection(db, PROJECTS_COLLECTION),
                where("team", "array-contains", currentUser.email)
            )

            const querySnapshot = await getDocs(q)

            const projectsArray = [];
            querySnapshot.forEach((doc) => {
                if(doc.data().isDeleted !== true){
                projectsArray.push({...doc.data(), id: doc.id});
                }
            });
            setProjects(projectsArray);

        } catch (error) {
            setErrorProjects('Failed to load projects')
        } finally {
            setLoadingProjects(false)
        }
    }
    fetchData()
}, [])

  return { loadingProjects, errorProjects, projects }
}
