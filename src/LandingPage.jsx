import React from "react";
import {withRouter} from "react-router-dom";
import {Box, Container, Typography, Button} from "@mui/material";

function LandingPage(props) {
	return <div>
		<Box sx={{backgroundColor: "primary.main"}}>
			<Container sx={{textAlign: "center"}}>
				<br/>
				<Typography color="white.main" variant="h1" component="h1">Погода</Typography>
				<br/>
				<Typography color="white.main" variant="h4" component="h2">Мой личный проект на React с использованием Node
					сервера и API</Typography>
				<br/>
				<Button variant="outlined" color="white" fullWidth onClick={() => props.history.push("/Moscow")}>Погода в Москве</Button>
				<br/>
				<br/>
			</Container>
		</Box>
	</div>
}

export default withRouter(LandingPage);