import 'firebase/database';
// import logo from './logo.svg';
import './App.css';
import 'rbx/index.css';
import 'firebase/auth';
import { firebase, storage } from './shared/firebase.js'
import React, { useState, useEffect } from 'react';
import RestaurantList from "./components/RestaurantList";
import HeaderBar from "./components/HeaderBar";
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserEventList from "./components/UserEventList";
import 'firebase/auth';
import PopupWindow from "./components/PopupWindow";


const db = firebase.database().ref();

const App = () => {
	const [user, setUser] = useState(null);
	const [initialRender, setInitialRender] = useState(true);
	const [schedule, setSchedule] = useState({ title: '', events: [], People: [] });
	const [currPage, setCurrPage] = useState("login");


	const handleLogout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				alert("Successfully signed out.");
			})
			.catch(() => {
				alert("Couldn't log out. Try again.");
			});
	};


	useEffect(() => {

		//authentication
		firebase.auth().onAuthStateChanged(user => {
			setUser(user);
			setInitialRender(false);
			// console.log(user);
		});

		const handleData = snap => {
			if (snap.val()) setSchedule(snap.val());
		};
		db.on('value', handleData, error => alert(error));
		return () => { db.off('value', handleData); };
	}, []);


	return (!initialRender && (
		<Router>
			<HeaderBar title={schedule.title} user={user} />
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/restaurant" component={() =>
					<React.Fragment>
						<div className="view_create">
							<Link to="/events">
								<button class="button" type="button">
									View My Events
                  				</button>
							</Link>
							<PopupWindow name={user} />
						</div>

						<RestaurantList name={user ? user.displayName : null} people={schedule.People} events={schedule.events} />
					</React.Fragment>
				} />
				<Route exact path="/events" component={() =>
					<React.Fragment>
						<div className="view_create">
						<Link to="/restaurant">
							<button class="button" type="button">
								Back to Home
                  			</button>
						</Link>
						<PopupWindow name={user} />
						</div>
						{/* make component where I pass in user (for username), events so that I can query each event's host and people's list */}
						<UserEventList name={user ? user.displayName : null} events={schedule.events} people={schedule.People} />
					</React.Fragment>
				} />

			</Switch>
		</Router>
	));

};

export default App;
