import React from "react"


 function Card(props){
    
    const drag = (ev) =>{
        console.log(ev.target.id);
        ev.dataTransfer.setData("text/plain",ev.target.id);
    }

    return(
        <div
            id = {props.id}
            className = {props.className}
            draggable = {props.draggable}
            onDragStart = {(ev) => drag(ev)}>
                <p>{props.children.length > 15 ? props.children.substring(0, 15)+'...' : props.children}</p>
                <div></div>
        </div>
    )
}

export default Card