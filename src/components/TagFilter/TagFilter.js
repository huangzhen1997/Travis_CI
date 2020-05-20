import {Button, Dropdown} from "rbx";
import React from "react";
import tags from '../../shared/tags'; // make one for tags

const buttonColor = selected => (
    selected ? 'success' : null
);


const Preference = ({ state }) => {

    return (
        <div className="filter">
            Tags:
            <Dropdown>
                <Dropdown.Trigger> <Button color="info"> {state.tag} &#9660; </Button> </Dropdown.Trigger>
                <Dropdown.Menu>
                    {
                        Object.values(tags)
                        .map(value =>
                            <Dropdown.Item key={value}
                                    color={ buttonColor(value === state.tag) }
                                    onClick={ () => state.setTag(value) } >
                                { value }
                            </Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>)
};

export default Preference;
