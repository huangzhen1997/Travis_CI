import {Button} from "rbx";
import CreateEvent from "./CreateEvent";
import Popup from "reactjs-popup";
import React from "react";
import { BrowserRouter as Link } from "react-router-dom";


const PopupWindow = (host) => {
    return (
        <div id='create_event_popup'>
        <Popup  trigger={<Button> Create My Event </Button>} position="bottom center" modal closeOnDocumentClick>
            <CreateEvent name={host}> </CreateEvent>
        </Popup>
        </div>
    );
};

export default PopupWindow;


