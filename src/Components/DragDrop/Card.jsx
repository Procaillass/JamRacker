import React from "react"
import Waveforms from '../Waveforms'



 function Card(props){
    
    const drag = (ev) =>{
        // console.log(ev.target.id);
        // console.log(ev.target.parentNode.classList.value);
        const obj = JSON.stringify({
            id: ev.target.id,
            parent: ev.target.parentNode.classList.value
        });
        ev.dataTransfer.setData("text/plain", obj);
    }

    const handleClick = (ev) => {
        ev.preventDefault();
        if(!ev.target.parentNode.closest(".tracker__step")) return;
        
        document.querySelector('.tracker__sounds')
            .appendChild(ev.target.closest(".tracker__sound"));
    }

    return(
        <div
            id = {props.id}
            data-url = {props.dataUrl}
            className = {props.className}
            draggable = {props.draggable}
            onDragStart = {(ev) => drag(ev)}
            onClick = {handleClick}>
                <p>{props.children.length > 30 ? props.children.substring(0, 15)+'...' : props.children}</p>
                <Waveforms url={props.dataUrl} id={props.id} />
        </div>
    )
}

export default Card