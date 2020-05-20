import {Button, Dropdown} from "rbx";
import React from "react";
import meals from '../../shared/meals'; // make one for tags

const buttonColor = selected => (
    selected ? 'success' : null
);


const MealFilter = ({ state }) => {

    return (
        <div className="filter">
            Meal:
            <Dropdown>
                <Dropdown.Trigger> <Button color="info"> {state.mealselection} &#9660; </Button> </Dropdown.Trigger>
                <Dropdown.Menu>
                    {
                        Object.values(meals)
                        .map(value =>
                            <Dropdown.Item key={value}
                                    color={ buttonColor(value === state.mealselection) }
                                    onClick={ () => state.setMealSelected(value) } >
                                { value }
                            </Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>)
};

export default MealFilter;
