import { Button, Card, Field, Label } from "rbx";
import React, { useState, useEffect } from 'react';
import firebase from '../../shared/firebase.js'
import "firebase/storage";

const storage = firebase.storage().ref();
const ref = storage.child("img").child("buffalo.jpg");


const GuestList = ({ event }) => {
    return (
        <li>
            <Card>
                <Card.Content>
                    <Field>
                        Gregg
                    </Field>
                </Card.Content>
            </Card>
            <br/>
        </li>
    );

};

export default GuestList;

