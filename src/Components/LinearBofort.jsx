import React from "react";
import {Typography, LinearProgress} from "@mui/material";

function LinearBofort (props) {
	function getScore (wind = props.wind) {
		if (wind <= 0.29) {
			return {
				score: 0,
				value: 0,
				title: "Штиль",
				color: "info",
			}
		} else if (wind <= 1.59) {
			return {
				score: 1,
				title: "Тихий",
				color: "info",
				value: 8,
			}
		} else if (wind <= 3.39) {
			return {
				score: 2,
				title: "Лёгкий",
				color: "info",
				value: 16,
			}
		} else if (wind <= 5.49) {
			return {
				score: 3,
				title: "Слабый",
				color: "info",
				value: 24,
			}
		} else if (wind <= 7.79) {
			return {
				score: 4,
				title: "Умеренный",
				color: "info",
				value: 33,
			}
		} else if (wind <= 10.79) {
			return {
				score: 5,
				title: "Свежий",
				color: "info",
				value: 41,
			}
		} else if (wind <= 13.89) {
			return {
				score: 6,
				title: "Сильный",
				color: "warning",
				value: 49,
			}
		} else if (wind <= 17.19) {
			return {
				score: 7,
				title: "Крепкий",
				color: "warning",
				value: 58,
			}
		} else if (wind <= 20.79) {
			return {
				score: 8,
				title: "Очень крепкий",
				color: "warning",
				value: 66,
			}
		} else if (wind <= 24.49) {
			return {
				score: 9,
				title: "Шторм",
				color: "error",
				value: 74,
			}
		} else if (wind <= 28.49) {
			return {
				score: 10,
				title: "Сильный шторм",
				color: "error",
				value: 83,
			}
		} else if (wind <= 32.69) {
			return {
				score: 11,
				title: "Жестокий шторм",
				color: "error",
				value: 91,
			}
		} else if (wind >= 32.7) {
			return {
				score: 12,
				title: "Ураган",
				color: "error",
				value: 100,
			}
		}
	}

	return <div>
		<br/>
		<LinearProgress color={getScore().color} variant="determinate" value={getScore().value}/>
		<Typography sx={{fontSize: 14}} color="text.secondary">{getScore().title}</Typography>
	</div>
}

export default LinearBofort;