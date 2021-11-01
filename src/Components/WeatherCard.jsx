import React from "react";
import {Card, CardContent, Grid, Typography} from "@mui/material";

function WeatherCard (props) {
	return <Grid item xs={12} lg={4}>
		<Card>
			<CardContent>
				<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>{props.title}</Typography>
				<Typography variant="h5" component="div">{props.value}</Typography>
				{props.children}
			</CardContent>
		</Card>
	</Grid>
}

export default WeatherCard;