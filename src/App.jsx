import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./Components/Header";
import MainPage from "./MainPage";
import LandingPage from "./LandingPage";

import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
	palette: {
		white: {
			main: "#fff",
		},
		black: {
			main: "#000",
		},
	},
});

function App() {
	return <ThemeProvider theme={theme}>
		<BrowserRouter>
			<Header/>
			<Route path="/" exact component={LandingPage}/>
			<Route path="/:city" exact component={MainPage}/>
		</BrowserRouter>
	</ThemeProvider>
}

export default App;
