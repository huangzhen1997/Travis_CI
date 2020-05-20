import React from "react";
import { Button,Navbar, Container} from "rbx";
// import { Link } from "react-router-dom";
import "../../App.css";
import {firebase} from "../../shared/firebase"
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../Login/Login";


const HeaderBar = ({ title,user}) => {

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


      return(<Navbar color='primary' variant="dark">
      <Navbar.Brand>

          <Container>
          {/*<Button>*/}
          {/*    Back*/}
          {/*</Button> */}
          </Container>
          {title}



      </Navbar.Brand>
      <label>Welcome ! {user ? (user.displayName) : "please sign in"}</label>
      {(user) ? (
                  <span className="auth-control">

                  <Button onClick={handleLogout} variant="outline-light">
                    Logout
                  </Button>
           </span>
                ) :
        (<Login to="/" className="auth-control">
        <Button variant="outline-light">Login</Button>
      </Login>

        )}



      </Navbar>
      )};


export default HeaderBar;
