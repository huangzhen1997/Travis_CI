import { render,fireEvent} from '@testing-library/react'
import React from "react";
import { getByTestId } from '@testing-library/dom';
import Restaurant from "./Restaurant/Restaurant";
import JoinButton from "./JoinButton";

test('Image loading as expected, the button works as expected', async () => {


    const name_input = "Zhen Huang";
    const people_input = [{
        "aboutme" : "I like naps and when I get tired of naps, I like to take a longer nap.",
        "id" : "2",
        "imageURL" : "https://firebasestorage.googleapis.com/v0/b/meetnewfriends-6e495.appspot.com/o/img%2Fgeorge.jpg?alt=media&token=5984faa4-6316-44d5-8b62-1024c517133f",
        "major" : "RFTV",
        "name" : "George Costanza",
        "year" : "2021"
    }, {
        "aboutme" : "Big salads are better than burger",
        "id" : "3",
        "imageURL" : "https://firebasestorage.googleapis.com/v0/b/meetnewfriends-6e495.appspot.com/o/img%2Felaine.jpg?alt=media&token=d49bab67-204a-4884-98cb-f13dbbdb736a",
        "major" : "Political Science",
        "name" : "Elaine Benis",
        "year" : "2019"
    }, {
        "aboutme" : "Golfing is fun when you're ditching classes",
        "id" : "4",
        "imageURL" : "https://firebasestorage.googleapis.com/v0/b/meetnewfriends-6e495.appspot.com/o/img%2Fkramer.jpg?alt=media&token=681c5de0-4373-421f-b59c-7fddc7f0f27c",
        "major" : "Undecided",
        "name" : "Cosmo Kramer",
        "year" : "2022"
    }];
    const event_input = [{
        "cuisine" : "Italian",
        "date" : "2020-04-20",
        "host": "George Costanza",
        "description" : "If you enjoy brunches, this is the place for you. Why settle for iHop when you can go with NU CS students to get the finest French Toast in Evanston?!",
        "group-size" : "3/10",
        "id" : "1",
        "imageURL" : "https://firebasestorage.googleapis.com/v0/b/meetnewfriends-6e495.appspot.com/o/img%2Fleedeep.jpg?alt=media&token=c379e94f-cb84-4207-9acf-797c40e1cde1",
        "name" : "Le Peep",
        "people" : [ "George Costanza", "Elaine Benis", "Cosmo Kramer"],
        "time" : "11:00-11:50",
        "tag": "School"
    }]

    const {getByTestId} = render(<Restaurant name={name_input[0]} event={event_input[0]} people={people_input[0]}/>);
    const image = await getByTestId('image-testing');
    const button = await getByTestId('join-button');

    expect(image).toBeInTheDocument();

    fireEvent.click(button);
    expect(button).toBeInTheDocument();
});

