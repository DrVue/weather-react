import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./Header";
import MainPage from "./MainPage";
import LandingPage from "./LandingPage";

function App() {
	return <BrowserRouter>
		<Header/>
		<Route path="/" exact component={LandingPage}/>
		<Route path="/:city" exact component={MainPage}/>
    </BrowserRouter>
}

export default App;
