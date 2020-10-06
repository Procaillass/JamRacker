import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { fire , db } from "../../fire"

function Login() {

  const history = useHistory();

  const email = createRef();
  const password = createRef();

  const [allFiles,setAllFiles] = useState();


  const fetchUser = () => {
    let data = [];
    db.collection("Users").get().then(snapshot =>{
        snapshot.forEach(doc => {
          data.push(doc.data());
      })
      setAllFiles(data);
    })
  }

  useEffect(()=>{
    fetchUser();
  },[])


  const signIn = () => {
    const mail = email.current.value;
    const passwd = password.current.value;
    allFiles.map((item)=>{
        if(item.email === mail){
            console.log(item.email,"===",mail)
        fire.auth().signInWithEmailAndPassword(mail,passwd).then(()=>{
            localStorage.setItem("pseudo",JSON.stringify(item.pseudo));
            window.location.href="/"
            history.push("/");
        })
      }
    })
    

  }
    return (
      <div>
          <section className='login'>
            <div className="loginContainer">
                <label>Email :</label> <input type="text" ref={email}/>
                <label>Mot de passe :</label> <input type="password" ref={password}/>
                <div className='btnContainer'>
                    <input type="submit" onClick={(ev)=> signIn(ev)} value="se connecter"/>
                    <Link className="btnRegister" to="/register">déjà un compte ? </Link>
                </div>
            </div>
        </section>
        
      </div>
    );
  }
  
  export default Login;