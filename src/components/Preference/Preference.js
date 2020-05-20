import {Button, Dropdown} from "rbx";
import React from "react";
import cuisine from '../../shared/data';

const buttonColor = selected => (
    selected ? 'success' : null
);


const Preference = ({ state }) => {

    return (
        <div className="filter">
            Cuisine:
            <Dropdown>
                <Dropdown.Trigger> <Button color="info"> {state.cuisine} &#9660; </Button> </Dropdown.Trigger>
                <Dropdown.Menu>
                    {
                        Object.values(cuisine)
                        .map(value =>
                            <Dropdown.Item key={value}
                                    color={ buttonColor(value === state.cuisine) }
                                    onClick={ () => state.setCuisine(value) } >
                                { value }
                            </Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>

            {/*<Dropdown>*/}
            {/*    <Dropdown.Trigger> <Button color="info"> Time &#9660; </Button> </Dropdown.Trigger>*/}
            {/*    <Dropdown.Menu>*/}
            {/*    <Dropdown.Item>*/}
            {/*        <TimePicker/>*/}
            {/*    </Dropdown.Item>*/}
            {/*    </Dropdown.Menu>*/}
            {/*</Dropdown>*/}

            {/*<Dropdown>*/}
            {/*    <Dropdown.Trigger> <Button color="info"> Size &#9660; </Button> </Dropdown.Trigger>*/}
            {/*    <Dropdown.Menu>*/}
            {/*    <Dropdown.Item>*/}
            {/*        <NumericInput  min={2} max={15} value={3} onClick={ () => state.setMaxSize(10) }/>*/}
            {/*    </Dropdown.Item>*/}
            {/*    </Dropdown.Menu>*/}
            {/*</Dropdown>*/}
        </div>)
};

export default Preference;
