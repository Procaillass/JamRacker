// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
// import '../../App.scss';
// import { db, fire } from '../../fire';
// import { storage } from 'firebase';

// const Login = () => {
//   //const [email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount,emailError, passwordError] = props
// // restriction enregistre
//   // { localStorage.getItem("pseudo") ? "" : <Redirect to="/Login"/> }

//   const [user, setUser] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [emailError, setEmailError] = useState('')
//   const [passwordError, setPasswordError] = useState('')
//   const [hasAccount, setHasAccount] = useState(false)
//   // const [pseudo, setPseudo] = useState("")
//   const history = useHistory();

//    let pseudo = ""
//   // let localPseudo = JSON.parse(localStorage.getItem('pseudo'))

//   const handleUser = (ev) => {

//     pseudo = ev.target.value
//     userPseudoToLocalStorage()
//   }


//   const userPseudoToLocalStorage = () => {
//     localStorage.setItem('pseudo', JSON.stringify(pseudo))
//   }
//   const clearInputs = () => {
//     setEmail('')
//     setPassword('')
//   }

//   const clearErrors = () => {
//     setEmailError('')
//     setPasswordError('')
//   }

//   const handleLogin = () => {
//     clearErrors()

//     fire
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(() => {
//         db.collection('Users').where("email", "==", email).get().then((snapshot) => {

//           snapshot.forEach((doc) => {
//             let pseudal = doc.data().pseudo

//             //setPseudo(pseudal)
//             pseudo = pseudal
//             localStorage.setItem("pseudo", JSON.stringify(pseudal))
//             history.push("/");
//           });
//         })

//       })
//       .catch(error => {

//         switch (error.code) {
//           case "auth/invalid-email":
//           case "auth/user-disable":
//           case "auth/user-not-found":
//             setEmailError(error.message)
//             break
//           case "auth/wrong-password":
//             setPasswordError(error.message)
//             break

//         }

//       })
//   }

//   const handleSignup = () => {
//     clearErrors()
//     db.collection('Users').doc(pseudo)
//       .set({
//         pseudo: pseudo,
//         email: email,
//         password: password,
//         create_at: new Date()
//       })
//     fire
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(() => {
//         history.push("/");
//       })
//       .catch(error => {
//         switch (error.code) {
//           case "auth/email-already-use":
//           case "auth/invalid-email":
//             setEmailError(error.message)
//             break
//           case "auth/weak-password":
//             setPasswordError(error.message)
//             break
//         }
//       })

//   }

//   // const handleLogout = () => {
//   //   fire.auth().signOut()
//   // }

//   const authlistener = () => {
//     fire.auth().onAuthStateChanged(user => {
//       if (user) {
//         clearInputs()
//         setUser(user)
//       } else {
//         setUser('')
//       }
//     })
//   }

//   useEffect(() => {
//     authlistener()
//   })
//   return (
//     <section className='login'>
      

//       <div className="loginContainer">

//          {/* <p>{pseudo}</p> */}

//         <label>Email</label>
//         <input type="text" 
//           autoFocus required 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} />
//         <p className="errorMsg">{emailError}</p>


//         <label>Mot de passe</label>
//         <input type="password" 
//           required 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} />
//         <p className="errorMsg">{passwordError}</p>
//         <div className='btnContainer'>
//           {hasAccount ?(
//             <>
//               <button className="logBtn" onClick={handleLogin}>Se connecter</button>
//               <p>Créer un compte : <span onClick={()=> setHasAccount(!hasAccount)}>S'inscire</span></p>
//             </>
//           ):(
//             <>
//             <label>Pseudo</label>
//             <input type="text" 
//               autoFocus required  
//             /*    value={props.pseudo}   */
//               onChange={(e) => handleUser(e)}  />
//             <p className="errorMsg"></p>
//             <br></br>
//             <br></br>
//               <button className="logBtn" type="submit" onClick={handleSignup}>S'inscire</button>
//               <p>Vous avez déjà un compte : <span onClick={()=> setHasAccount(!hasAccount)}>Se connecter</span></p>
//             </>
//           )}
//         </div>


//       </div>
  
//     </section>
//   )
// }

// export default Login