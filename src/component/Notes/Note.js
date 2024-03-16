import React from "react";

const Note = (props) => {
    const {title, noteClicked} = props;
    return(
        <li className='note-item' onClick={noteClicked}>{title}</li>
    )
}

export default Note;