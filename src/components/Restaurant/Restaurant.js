import { Button, Card, Field, Label } from "rbx";
import React, { useState, useEffect } from 'react';
import { firebase } from '../../../src/shared/firebase.js'
import "firebase/storage";
import GuestListPopup from '../GuestListPopup';
import JoinButton from "../JoinButton";
// import ViewList from '../ViewList';
import EditPopUp from "../EditPopUp";
import { confirmAlert } from 'react-confirm-alert';

const storage = firebase.storage().ref();
const ref = storage.child("img").child("buffalo.jpg");


const Restaurant = ({ name, event, people }) => {
    console.log(event);
    const [image, setImage] = useState("");
    const [joined, setJoined] = useState(false);
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


    useEffect(() => {
        // var ref.getDownloadURL().then((downloadURL) => {
        //     console.log("HELLO");
        //     console.log(downloadURL);
        // });
        ref.getDownloadURL()
            .then(downloadURL => {
                setImage(downloadURL);
            })
            .catch(() => {
                // console.log("error");
            });
    }, [image, setImage]);

    const handleJoin = () => {
        setJoined(!joined);
    };

    const timeInfo = matchMeal(event["time"]);

    const props = {
        groupSize: event["group-size"],
        group: event["people"],
        people: people
    };

    const propsForJoin = {
        id: event["id"],
        groupSize: event["group-size"],
        group: event["people"],
        name: name
    };

    const propsforEdit = {
        username: name,
        host: event["host"],
        id: event["id"],
        cuisine: event["cuisine"],
        date: event["date"],
        description: event["description"],
        groupSize: event["group-size"],
        tag: event["tag"],
        time: event['time'],
        resname: event["name"],
        url: event["imageURL"]
    };

    const removeEvent = id => {
        if (name === event["host"]) {
            confirmAlert({
                title: 'Confirm to REMOVE this event',
                message: 'Are you sure to do this?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            const idRef = firebase.database().ref('events/' + id);
                            idRef.remove();
                        }
                    },
                    {
                        label: 'No'
                    }
                ]
            });

        }

    };

    return (
        <li>
            <Card>
                <Card.Image>
                    <img src={event.imageURL} style={{ width: 300, height: 200 }} alt="Logo" />
                </Card.Image>

                <Card.Header>
                    {event["name"]}
                </Card.Header>

                <Card.Content>
                    <Field>
                        <Label className="tag">{event["tag"]}</Label>

                    </Field>
                    <Field>
                        <Label>Cuisine: </Label>
                        {event["cuisine"]}
                    </Field>
                    <Field>
                        {/* <p> */}
                        <Label> Date: </Label>
                        {event["date"]}
                        {/* </p> */}

                    </Field>
                    <Field>
                        {/* make p tag not be at the right */}

                        <Label>Attendee:
                        <GuestListPopup {...props} current={event["group-size"]}>

                                button is here

                        </GuestListPopup>
                        </Label>

                    </Field>
                    <Field>
                        <Label> Time: </Label>
                        {timeInfo[0]}
                        <Label> starts: </Label>
                        {timeInfo[1]}
                        <Label> for </Label>
                        {timeInfo[2]}
                    </Field>

                    <Field>
                        {event['description']}
                    </Field>
                    <Field>
                        <Button.Group>

                            {<Button value={event['id']} disabled={name !== event["host"]} onClick={() => removeEvent(event.id)} as="a">Remove</Button>}
                            <p className='join-button'>
                                <EditPopUp {...propsforEdit} />
                                <JoinButton {...propsForJoin} />

                            </p>

                        </Button.Group>


                    </Field>

                </Card.Content>

            </Card>
            <br />
        </li>
    );

};


export default Restaurant;

