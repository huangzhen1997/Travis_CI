import { Button } from "rbx";
import React, { useState } from 'react';
import Restaurant from './Restaurant/Restaurant';
import Preference from "./Preference/Preference";
import TagFilter from "./TagFilter/TagFilter"
import MealFilter from "./MealFilter"



const RestaurantList = ({ name, events, people }) => {
    const [cuisine, setCuisine] = useState('Pick Cuisine');
    const [maxsize,setMaxSize] = useState('10');
    const [tag, setTag] = useState('Pick Tag');
    const [mealselection,setMealSelected] = useState('Pick Meal');


    const meals = ['Breakfast', 'Lunch', 'Dinner'];

    const matchMeal = duration => {

        let meal = null;
        let times = duration.split("-");
        
        let startTime = times[0];
        let endTime = times[1];

        let startTimeHour = parseInt(startTime.split(":")[0]);
        let endTimeHour = parseInt(endTime.split(":")[0]);
        let startTimeMinute = parseInt(startTime.split(":")[1]);
        let endTimeMinute = parseInt(endTime.split(":")[1]);

        if (startTimeHour < 12) {
            meal = meals[0];
        }

        else if (startTimeHour <= 18) {
            meal = meals[1];
        }
        else {
            meal = meals[2];
        }


        let durationHour = (endTimeHour - startTimeHour).toString();
        let durationMinute = (endTimeMinute - startTimeMinute).toString();
        let durationFormat = (durationHour === "0") ? (durationMinute + "min") :
            ((durationMinute === "0" ? (durationHour + "hr") : durationHour + "hr " + durationMinute + "min"))

        //const time = duration.parse('-');
        return [meal, startTime, durationFormat];
    };

    // console.log(people);
    //const timeInfo = matchMeal(events["time"]);

    //const mealMatch = event => mealselection===timeInfo[0];

    const ANDMatch = event => cuisine === event.cuisine;
    const tagMatch = event => tag === event.tag;
    const mealMatch = event => mealselection=== matchMeal(event.time)[0];
    

    const matchedRestaurants = (events) => {
        if ((cuisine === 'Pick Cuisine' || cuisine === "All") && (tag === "Pick Tag" || tag === "All") && (mealselection==="Pick Meal"|| mealselection==="All")) {
            return events;
        }
        else {
            // convert json to array
            const arr = [];
            Object.values(events).forEach(value => arr.push(value));


            
            if (cuisine === 'Pick Cuisine' || cuisine === "All" ){

                if((tag === "Pick Tag" || tag === "All")){
                    return arr.filter(mealMatch);
                }

                else{
                    if(mealselection==="Pick Meal"|| mealselection==="All"){
                        return arr.filter(tagMatch);
                    }
                    else{
                        return arr.filter(tagMatch).filter(mealMatch);
                    }
                }
                
            }

            else if (tag === "Pick Tag" || tag === "All"){
                if(mealselection==="Pick Meal"|| mealselection==="All"){
                    return arr.filter(ANDMatch);
                }
                else{
                    return arr.filter(ANDMatch).filter(mealMatch);
                }
            }

            else if(mealselection==="Pick Meal"|| mealselection==="All"){
                if(tag === "Pick Tag" || tag === "All"){
                    return arr.filter(ANDMatch);
                }
                else{
                    return arr.filter(ANDMatch).filter(tagMatch);
                }
            }

            else{
                return arr.filter(ANDMatch).filter(tagMatch).filter(mealMatch);
            }
           
        }
    };

    const availableWords = (restaurantList) => {
        if (restaurantList.length > 0) {
            return "Available restaurants:";
        }
        else {
            return "Following restaurants match:";
        }
    };

    // console.log(matchedRestaurants(events));


    return (
        <React.Fragment>
            <div className='rest_filters'>
            <Preference state={{ cuisine, setCuisine,maxsize,setMaxSize }} />
            <TagFilter state={{ tag, setTag }} />
            <MealFilter state={{mealselection,setMealSelected}} />
            </div>
            

                <div className='restaurant-list'>
                    {availableWords(matchedRestaurants(events))}
                    <center>
                        <div className="col-md-6 restaurant-info" alt="Max-width 100%">
                            <ul>
                                {
                                    Object.values(matchedRestaurants(events)).map((e) => {
                                        return (
                                            <Restaurant name={(name===null) ? null : name} key={e.id} people={people} event={e} />
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </center>

                    {/* </div> */}
                </div>
        </React.Fragment>
    );
};

export default RestaurantList;
