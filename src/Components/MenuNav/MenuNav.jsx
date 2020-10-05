import React from "react";
import { useHistory } from "react-router";

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
        <select onChange={handleChangeSelect} className="header_select" >
            <option value="/">Home</option>
            <option value="/playlist">Playlist</option>
            <option value="/library">Library</option>
        </select>
    )
}

export default MenuNav;