import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import {fire, db} from "../../fire";

function Register() {

  const [mailUser,setMailUser] = useState([])

  const email = createRef();
  const password = createRef();
  const pseudo = createRef();

  const history = useHistory();


  const fetchUser = () => {
    db.collection("Users").get().then( querySnapshot => {
      let data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data().email)
      });
      setMailUser(data);
    })
  }
  useEffect(()=>{
    fetchUser();
  },[])
  
  const signUp = () => {
    
    const mail = email.current.value;
    const passwd = password.current.value;
    const username = pseudo.current.value;

    mailUser.map(item=>{
      if(item !== mail){
        db.collection("Users").doc(username).set({
            pseudo:username,
            mail:mail,
            password:passwd,
            create_at: new Date()
        })
        
        
        fire.auth().createUserWithEmailAndPassword(mail,passwd).then(doc => {
          localStorage.setItem('pseudo', JSON.stringify(username))
          window.location.href="/"
          history.push("/")
        });
      }else{
        alert("le mail que vous avez rentré est déjà utiliser veuillez entrer un autre ou vous connectez ! ")
      }
      console.log("mailUser => ",item)
    })

    
    

  }
    return (
      <div>
        <section className='login'>
            <div className="loginContainer">
                <label>Email :</label> <input type="text" ref={email}/>
                <label>Mot de passe :</label> <input type="password" ref={password}/>
                <label>Pseudo :</label><input type="text" ref={pseudo} required/>
                <p className="errorMsg"></p>
                <div className='btnContainer'>
                    <input type="submit" onClick={(ev)=> signUp(ev)} value="se connecter"/>
                    <Link className="btnRegister" to="/register">Déjà de compte ? </Link>
                </div>
            </div>
        </section>
      </div>
    );
  }
  
  export default Register;