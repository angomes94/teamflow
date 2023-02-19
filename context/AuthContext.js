import React, { useContext, useState, useEffect, useRef } from 'react'
import { auth, db } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { addDoc, doc, getDocs,getDoc, setDoc, arrayUnion, arrayRemove, updateDoc, deleteDoc, collection, query, where } from 'firebase/firestore'
import { async } from '@firebase/util'
import { PROJECTS_COLLECTION, TASKS_COLLECTION, TASK_STATUS, USERS_COLLECTION } from '@/utils/constants'


const AuthContext = React.createContext()


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)



    async function signup(email, password, username) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;

        await updateProfile(currentUser, { displayName: username });
        await setDoc(doc(db, USERS_COLLECTION , currentUser.uid), {
            email: email,
            name: username,
            uid: currentUser.uid,
            selectedProjectID: ""
        });
    }




    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }


    function logout() {
        return signOut(auth)
    }



    async function checkIfUserExists(useremail) {
        const querySnapshot = await getDocs(query(
          collection(db, USERS_COLLECTION),
          where("email", "==", useremail)
        ));
        
        return !querySnapshot.empty;
      }
      
      


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])


    

    ///////////////////////////////////////////////////



    async function createProject(projectName, firestoreTasks) {

        const team = firestoreTasks.map(task => task.assignedTo)
            .filter((value, index, self) => self.indexOf(value) === index);


        const projectRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
            name: projectName,
            team: team,
            owner: currentUser.email,
            isDeleted: false,
            
        });

        const docRef = doc(db, PROJECTS_COLLECTION, projectRef.id)
        const tasksColRef = collection(docRef, TASKS_COLLECTION)

        firestoreTasks.forEach(async (task) => {
            await addDoc(tasksColRef, {
                title: task.title,
                status: task.status,
                assignedTo: task.assignedTo,
              
            });
        });
    }


    async function setFirestoreProjectID(projectid) {

        const userRef = doc(db, USERS_COLLECTION, currentUser.uid)

        await updateDoc(userRef, {
            selectedProjectID: projectid
        });

    }




    async function createNewTask(projectid, task, member) {

        const docRef = doc(db, PROJECTS_COLLECTION, projectid)
        const tasksColRef = collection(docRef, TASKS_COLLECTION)


      

            await addDoc(tasksColRef, {
                title: task,
                status: TASK_STATUS.TODO,
                assignedTo: member
            });


    }




    async function deleteTask(projectid, taskid) {


        await deleteDoc(doc(db, PROJECTS_COLLECTION, projectid, TASKS_COLLECTION, taskid))


    }


    async function inviteNewMember(projectid, member) {

        const docRef = doc(db, PROJECTS_COLLECTION, projectid)

        await updateDoc(docRef, {
            team: arrayUnion(member)
        });

    }

    async function modifyTask(projectid, taskid, task) {

        const taskRef = doc(db, PROJECTS_COLLECTION, projectid, TASKS_COLLECTION, taskid);

        await updateDoc(taskRef, {
            title: task
        });

    }

    async function modifyTaskStatus(projectid, taskid, status) {

        const taskRef = doc(db, PROJECTS_COLLECTION, projectid, TASKS_COLLECTION, taskid);

        await updateDoc(taskRef, {
            status: status
        });

    }

    async function deleteTeamMember(projectid, member) {

        const docRef = doc(db, PROJECTS_COLLECTION, projectid)

        const q = query(
            collection(db, PROJECTS_COLLECTION, projectid, TASKS_COLLECTION),
            where("assignedTo", "==", member)
        )

        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((task) => {
            deleteDoc(doc(db, PROJECTS_COLLECTION, projectid, TASKS_COLLECTION, task.id))
        })

        await updateDoc(docRef, {
            team: arrayRemove(member)
        });

    }


    async function deleteProject(projectid) {

        const projectRef = doc(db, PROJECTS_COLLECTION, projectid);

        await updateDoc(projectRef, {
            isDeleted: true
        });


    }

    async function changeProjectName (projectid, projectname) {

        const docRef = doc(db, PROJECTS_COLLECTION, projectid)

        await updateDoc(docRef, {
            name: projectname
        });

    }


    async function modifyAssignedTo(projectid, taskid, member) {

        const taskRef = doc(db, PROJECTS_COLLECTION, projectid, TASKS_COLLECTION, taskid);

        await updateDoc(taskRef, {
            assignedTo: member
        });

    }

    async function checkIfUserIsProjectOwner (projectid) {

        const docRef = doc(db, PROJECTS_COLLECTION, projectid)

        const docSnap = await getDoc(docRef);

        return docSnap.data().owner === currentUser.email
        
    }

    async function checkIfUserIsTaskAssignedTo (projectid, taskid) {

        const docRef = doc(db, PROJECTS_COLLECTION, projectid, TASKS_COLLECTION, taskid )

        const docSnap = await getDoc(docRef);

        return docSnap.data().assignedTo === currentUser.email
        
    }





    const value = {
        currentUser,
        login,
        signup,
        checkIfUserExists,
        logout,
        createProject,
        setFirestoreProjectID,
        createNewTask,
        deleteTask,
        inviteNewMember,
        modifyTask,
        modifyTaskStatus,
        deleteTeamMember,
        deleteProject,
        changeProjectName,
        modifyAssignedTo,
        checkIfUserIsProjectOwner,
        checkIfUserIsTaskAssignedTo
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}