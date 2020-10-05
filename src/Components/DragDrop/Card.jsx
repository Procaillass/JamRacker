import React from "react"
import Waveforms from '../Waveforms'



 function Card(props){
    
    const drag = (ev) =>{
        console.log(ev.target.id);
        ev.dataTransfer.setData("text/plain",ev.target.id);
    }

    return(
        <div
            id = {props.id}
            data-url = {props.dataUrl}
            className = {props.className}
            draggable = {props.draggable}
            onDragStart = {(ev) => drag(ev)}>
                <p>{props.children.length > 15 ? props.children.substring(0, 15)+'...' : props.children}</p>
                <Waveforms url={props.dataUrl} id={props.id} />
        </div>
    )
}

export default Card