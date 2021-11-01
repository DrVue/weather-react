import React, {useState, useEffect} from "react";
import {Container, Grid, LinearProgress, CircularProgress} from "@mui/material";
import axios from "axios";
import moment from "moment";
import WeatherIcons from "react-animated-weather";
import WeatherCard from "./Components/WeatherCard";
import LinearBofort from "./Components/LinearBofort";
import {KeltoCel} from "temperatureconv";

function MainPage(props) {
	const [city, setCity] = useState(props.match.params.city ? props.match.params.city : "Moscow");

	const [data, setData] = useState({});
	const [temp, setTemp] = useState(0);
	const [tempSys, setTempSys] = useState("°C");

	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingDisplay, setIsLoadingDisplay] = useState(true);

	function getWeather(loc) {
		axios.post("/get/one", {
			city: loc
		}).then((d) => {
			setTemp(d.data.weather.main.temp);
			setData(d.data.weather);
			setIsLoading(false);
			setIsLoadingDisplay(false);
		})
	}

	function getWind(deg) {
		if (deg >= 348.75 && deg < 11.25) {
			return "С";
		} else if (deg >= 11.25 && deg < 33.75) {
			return "ССВ";
		} else if (deg >= 33.75 && deg < 56.25) {
			return "СВ";
		} else if (deg >= 56.25 && deg < 78.75) {
			return "ВСВ";
		} else if (deg >= 78.75 && deg < 101.25) {
			return "В";
		} else if (deg >= 101.25 && deg < 123.75) {
			return "ВЮВ";
		} else if (deg >= 123.75 && deg < 146.25) {
			return "ЮВ";
		} else if (deg >= 146.25 && deg < 168.75) {
			return "ЮЮВ";
		} else if (deg >= 168.75 && deg < 191.25) {
			return "Ю";
		} else if (deg >= 191.25 && deg < 213.75) {
			return "ЮЮЗ";
		} else if (deg >= 213.75 && deg < 236.25) {
			return "ЮЗ";
		} else if (deg >= 236.25 && deg < 258.75) {
			return "ЗЮЗ";
		} else if (deg >= 258.75 && deg < 281.25) {
			return "З";
		} else if (deg >= 281.25 && deg < 303.75) {
			return "ЗСЗ";
		} else if (deg >= 303.75 && deg < 326.25) {
			return "СЗ";
		} else if (deg >= 326.25 && deg < 348.75) {
			return "ССЗ";
		}
	}

	function getIconNameWeather(code, icon = "01d") {
		const c = code.toString();
		if (c[0] === "2") {
			return "CLOUDY";
		} else if (c[0] === "3") {
			return "RAIN"
		} else if (c[0] === "5") {
			return "SLEET"
		} else if (c[0] === "6") {
			return "SNOW"
		} else if (c === "731" || c === "771" || c === "781") {
			return "WIND"
		} else if (c[0] === "7") {
			return "FOG"
		} else if (c === "800") {
			if (icon[2] === "d") {
				return "CLEAR_DAY";
			} else if (icon[2] === "n") {
				return "CLEAR_NIGHT";
			}
		} else if (c === "801" || c === "802") {
			if (icon[2] === "d") {
				return "PARTLY_CLOUDY_DAY";
			} else if (icon[2] === "n") {
				return "PARTLY_CLOUDY_NIGHT";
			}
		} else if (c === "803" || c === "804") {
			return "CLOUDY";
		}
	}

	useEffect(() => {
		if (isLoading) {
			getWeather(props.match.params.city)
		}
		if (city !== props.match.params.city) {
			setCity(props.match.params.city);
			setIsLoading(true);
		}

	})

	return <Container>
		{
			!isLoadingDisplay
				? <div>
					<h3>{city} | {data.weather[0].description}</h3>
					<h1><WeatherIcons icon={getIconNameWeather(data.weather[0].id, data.weather[0].icon)} size={45}/> {KeltoCel(temp).toFixed(1)} {tempSys}</h1>
					<h5>{KeltoCel(data.main.temp_min).toFixed(1)} {tempSys} / {KeltoCel(data.main.temp_max).toFixed(1)} {tempSys}</h5>
					<br/>
					<Grid container spacing={2}>
						<WeatherCard title="Ветер" value={`${data.wind.speed} м/с ${getWind(data.wind.deg)}`}><LinearBofort wind={data.wind.speed}/></WeatherCard>
						<WeatherCard title="Восход/Закат" value={`${moment(data.sys.sunrise, "X").format("HH:mm")} - ${moment(data.sys.sunset, "X").format("HH:mm")}`}/>
						<WeatherCard title="Давление" value={`${(data.main.pressure / 1.333).toFixed(2)} мм рт ст`}/>
						<WeatherCard title="Влажность" value={`${data.main.humidity} %`}><div><br/><LinearProgress variant="determinate" value={data.main.humidity}/></div></WeatherCard>
						<WeatherCard title="Видимость" value={`${data.visibility} м`}><div><br/><LinearProgress variant="determinate" value={data.visibility / 100}/></div></WeatherCard>
					</Grid>
				</div>
				: <CircularProgress/>
		}
	</Container>
}

export default MainPage;