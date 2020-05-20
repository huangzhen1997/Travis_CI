import {Button} from "rbx";
import EditEvent from "./EditEvent";
import Popup from "reactjs-popup";
import React from "react";


const EditPopUp = (props) => {
    return (
        <Popup trigger={<Button id = 'edit-button' disabled={props["username"] !== props["host"]}> Edit this event</Button>} position="bottom center" modal closeOnDocumentClick>
            <EditEvent {...props}> </EditEvent>
        </Popup>
    );
};

export default EditPopUp;


