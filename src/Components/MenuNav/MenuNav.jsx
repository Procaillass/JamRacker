import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function MenuNav() {

    /*
    * -------------
    * History
    * -------------
    */

    const history = useHistory();

    /*
    * -------------
    * HANDLERS
    * -------------
    */

    const handleChangeSelect = (e) => {
        const path = e.target.value
        history.push(path);
    }

     /*
    * -------------
    * RENDER
    * -------------
    */

    return (
        <nav>
            <Link to="/playlist">Playlist</Link>
            <Link to="/piano-roll">Piano roll</Link>
            <Link to="/step-sequencer">Step sequencer</Link>
        </nav>
    )
}

export default MenuNav;