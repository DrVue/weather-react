import React, {useState, useEffect} from "react";
import {Container, Grid, Card, CardContent, Typography} from "@mui/material";
import axios from "axios";
import moment from "moment";
import {KeltoCel} from "temperatureconv";

function MainPage(props) {
	const [city, setCity] = useState(props.match.params.city ? props.match.params.city : "Moscow");

	const [data, setData] = useState({});
	const [temp, setTemp] = useState(0);
	const [tempSys, setTempSys] = useState("°C");

	const [isLoading, setIsLoading] = useState(true);

	function getWeather(loc) {
		axios.post("/get/one", {
			city: loc
		}).then((d) => {
			setTemp(d.data.weather.main.temp);
			setData(d.data.weather);
			setIsLoading(false);
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
			!isLoading
				? <div>
					<h3>{city} | {data.weather[0].description}</h3>
					<h1>{KeltoCel(temp).toFixed(1)} {tempSys}</h1>
					<h5>{KeltoCel(data.main.temp_min).toFixed(1)} {tempSys} / {KeltoCel(data.main.temp_max).toFixed(1)} {tempSys}</h5>
					<br/>
					<Grid container spacing={2}>
						<Grid item xs={12} lg={4}>
							<Card>
								<CardContent>
									<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>Ветер</Typography>
									<Typography variant="h5" component="div">{data.wind.speed} м/с {getWind(data.wind.deg)}</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} lg={4}>
							<Card>
								<CardContent>
									<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>Восход/Закат</Typography>
									<Typography variant="h5" component="div">{moment(data.sys.sunrise, "X").format("HH:mm")} - {moment(data.sys.sunset, "X").format("HH:mm")}</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} lg={4}>
							<Card>
								<CardContent>
									<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>Давление</Typography>
									<Typography variant="h5" component="div">{(data.main.pressure / 1.333).toFixed(2)} мм рт ст</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} lg={4}>
							<Card>
								<CardContent>
									<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>Влажность</Typography>
									<Typography variant="h5" component="div">{data.main.humidity} %</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} lg={4}>
							<Card>
								<CardContent>
									<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>Видимость</Typography>
									<Typography variant="h5" component="div">{data.visibility} м</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</div>
				: <p>Loading...</p>
		}
	</Container>
}

export default MainPage;