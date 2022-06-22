import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

//to configure axios into post request using axios interceptor
const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    //we need to maintain a token,a user, and issues in state
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        issues: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    //not sure yet
    const [userIssues, setUserIssues] = useState([])

    function signup(credentials){
        axios.post("/auth/signup", credentials)
            //.then(res => console.log(res)) // to test it
            .then(res => {
                const { user, token } = res.data
                //so this state gets saved in local storage and doesnt logout when refresh page
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState, 
                    user, 
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post("/auth/login", credentials)
            //.then(res => console.log(res)) // to test it
            .then(res => {
                const { user, token } = res.data
                //so this state gets saved in local storage and doesnt logout when refresh page
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                //call get user todos
                getUserIssues()

                setUserState(prevUserState => ({
                    ...prevUserState, 
                    user, 
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            issues: []
        })
    }

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    // get issues created by user
    function getUserIssues(){
        userAxios.get("/api/issues/user")
        // .then(res => console.log(res))
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }))
        })
        .catch(err => console.dir(err.response.data.errMsg))
    }

    function addIssue(newIssue){
        userAxios.post("/api/issues", newIssue)
        // .then(res => console.log(res))
        .then(res => {
            //we want to update state with new info but maintain user and token the same
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.dir(err.response.data.errMsg))
    }

    //VERIFY WITH TRAVEL LOG APP -------------------------------
    // edit issue function with interceptor
//   const editIssue = (id, updateIssue) => {
//     userAxios
//       .put(`https://johnd-rvt.herokuapp.com/api/issues/${id}`, updateIssue)
//       .then((res) => {
//         setUserState((prevState) => ({
//           ...prevState,
//           issues: prevState.issues.map((issue) =>
//             issue._id === id ? res.data : issue
//           ),
//         }));
//       })
//       .catch((err) => console.log(err.response.data.errMsg));
//   };

//   // delete issue function with interceptor
//   const deleteIssue = (id) => {
//     userAxios
//       .delete(`https://johnd-rvt.herokuapp.com/api/issues/${id}`)
//       .then((res) => {
//         setUserState((prevState) => ({
//           ...prevState,
//           issues: prevState.issues.filter((issue) => issue._id !== id),
//         }));
//       })
//       .catch((err) => console.log(err.response.data.errMsg));
//   };

//   // get issues created by user
//   const getMyIssues = () => {
//     userAxios
//       .get(
//         `https://johnd-rvt.herokuapp.com/api/issues/user/${userState.user._id}`
//       )
//       .then((res) => setUserIssues(res.data))
//       .catch((err) => console.log(err.response.data.errMsg));
//   };

//   useEffect(() => {
//     getMyIssues();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userState]);

    return (
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                addIssue,
                // editIssue,
                // deleteIssue,
                handleAuthErr,
                resetAuthErr
            }}>
            {props.children}
        </UserContext.Provider>
    )
}