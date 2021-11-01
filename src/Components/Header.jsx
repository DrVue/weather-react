import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import {styled, alpha} from "@mui/material";
import {AppBar, Box, Toolbar, IconButton, Typography, InputBase, Button, InputAdornment} from "@mui/material";
import MenuIcon from "@mui/icons-material/Cloud";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({theme}) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

function Header(props) {
	const [citySearch, setCitySearch] = useState("");

	return <Box sx={{flexGrow: 1}}>
		<AppBar position="fixed">
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					sx={{mr: 2}}
					onClick={() => props.history.push("/")}
				>
					<MenuIcon/>
				</IconButton>
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{flexGrow: 1, display: {xs: "none", sm: "block"}}}
				>
					Weather
				</Typography>
				<Search>
					<form onSubmit={() => {
						props.history.push("/" + citySearch)
					}}>
						<StyledInputBase
							placeholder="Город"
							onChange={event => {
								setCitySearch(event.target.value)
							}}
							endAdornment={
								<InputAdornment position="start">
									<IconButton
										onClick={() => {
											props.history.push("/" + citySearch)
										}}
									>
										<SearchIconWrapper>
											<SearchIcon/>
										</SearchIconWrapper>
									</IconButton>
								</InputAdornment>
							}
						/>
					</form>
				</Search>
			</Toolbar>
		</AppBar>
		<Toolbar/>
	</Box>
}

export default withRouter(Header);