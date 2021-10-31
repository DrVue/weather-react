import React from "react";
import {Box, Container, Typography} from "@mui/material";

function LandingPage () {
	return <div>
		<Box sx={{backgroundColor: "primary.main"}}>
			<Container>
				<Typography variant="h1" component="h3">Погода</Typography>
				<Typography variant="h2" component="h5">Мой личный проект на React с использованием Node сервера и API</Typography>
			</Container>
		</Box>
	</div>
}

export default LandingPage;