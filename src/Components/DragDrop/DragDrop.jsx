import React, {useContext, useState} from "react";
import DragDropContext, { DragDropProvider } from "../../context/dragDropContext";
import "./DragDrop.scss";

function DragDrop(props) {
    let itsHere = false;

    let [listNote,setListNote] = useState([]);
    const {dataDragDrop, setDataDragDrop} = useContext(DragDropContext);

    const drop = (ev) => {
        ev.preventDefault();
        
        // recuepere les données en fonction de l'id de la personne cibler
        let data = ev.dataTransfer.getData(ev.target.id);
        console.log("drag",data)
                
        // condition pour voir si l'element est deja a l'interieure ou non
        if(!itsHere){

            ev.target.appendChild(document.getElementById(data))
            const step = props.step;
            const track = props.track;
            setDataDragDrop({...dataDragDrop,step, track,data})
            
        }
        else{
            return console.log("joe",itsHere)
        }
       
        
    }
    // moment du drag ou l'on passe au dessus des blocks ou l'ont peut deposé les blockElements
    const allowDrop = (ev) =>{
        ev.preventDefault();

        if(!(ev.target.id === "move")){
            itsHere = true;
        }
        
    }

    
    return(
        
        <div
        id= {props.id}
        className= {props.className}
        onDrop={(ev) => drop(ev)}
        onDragOver={ (ev) => allowDrop(ev)}
        >
        {props.children}
        </div>
        
    )
}

export default DragDrop;