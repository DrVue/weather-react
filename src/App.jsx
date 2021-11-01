import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./Components/Header";
import MainPage from "./MainPage";
import LandingPage from "./LandingPage";

import {createTheme, ThemeProvider} from "@mui/material";
import {Container, Typography, Link} from "@mui/material";

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
		<br/>
		<Container>
			<Typography variant="body2" component="div"><Link href="https://github.com/drvue/">Ivan "Dr.Vue" Panasyuk</Link> © - 2021</Typography>
			<Typography variant="body2" component="div">Данные предоставлены <Link href="https://openweathermap.org/">OpenWeatherMap</Link></Typography>
			<Typography variant="body2" component="div">With love to React</Typography>
			<Typography variant="body2" component="div">v 1.0.0</Typography>
		</Container>
	</ThemeProvider>
}

export default App;
