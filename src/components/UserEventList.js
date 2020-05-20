import { Button } from "rbx";
import React, { useState } from 'react';
import Restaurant from './Restaurant/Restaurant';
import Preference from "./Preference/Preference";
import TagFilter from "./TagFilter/TagFilter";
import { BrowserRouter as Link } from "react-router-dom";



const UserEventList = ({ name, events, people }) => {
    const hostedRestaurants = (events) => {
        // for each event check if host === name and if people list contains name
        const arr = [];
        if (events){
            Object.values(events).forEach(value => value.host === name ? arr.push(value) : console.log(''));
            return arr;
        }
        else{
            return arr;
        }
    };

    const joinedRestaurants = (events) => {
        // for each event check if host === name and if people list contains name
        const arr = [];
        if(events){
            Object.values(events).forEach(value => value.people.includes(name) ? arr.push(value) : console.log(''));
            return arr;
        }
        else{
            return arr;
        }
    };

    console.log(hostedRestaurants(events))

    const hR = hostedRestaurants(events);

    return (
        <React.Fragment>
              <div className="col-md-6 restaurant-info" alt="Max-width 100%">
                  <h3>Events you're hosting</h3>
                  <ul>
                      {
                      Object.values(hostedRestaurants(events)).map((e) => {
                          return (
                              <Restaurant name={(name===null) ? null : name} key={e.id} people={people} event={e} />
                          )
                      })
                      }
                  </ul>
                  <hr></hr>
              </div>
  
              <div className="col-md-6 restaurant-info" alt="Max-width 100%">
                  <h3>Events you've joined</h3>
                  <ul>
                      {
                      Object.values(joinedRestaurants(events)).map((e) => {
                          return (
                              <Restaurant name={(name===null) ? null : name} key={e.id} people={people} event={e} />
                          )
                      })
                      }
                  </ul>
              </div>
                  
         </React.Fragment>
    );
};

export default UserEventList;
