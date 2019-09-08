import React from "react";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
	* {
		@import url("https://fonts.googleapis.com/css?family=Anton&display=swap");
		font-family: Anton;		
	}
`;

export const ClickArea = styled.div`
	font-family: Anton;
	font-size: 3em;
	background-color: ${props =>
		props.states[0]
			? !props.states[1]
				? "black"
				: "#ef4b4b"
			: props.states[2] <= 1
			? "black"
			: "#47e4bb"};
	color: white;
	height: 100vh;
	width: 100vw;
	vertical-align: middle;
	display: grid;
	grid-template-rows: 1fr; /* 1fr 1fr; */
	grid-template-columns: 1fr; /* 1fr 1fr; */
	text-align: center;
`;

export const Text = props => {
	// const { states } = props;
	const [clickState, start, ongoing, begin, init, average] = props.states;

	const text = clickState
		? start
			? "I'M RED"
			: "This is a reaction-time benchmark, built with react hooks.\nClick to begin"
		: ongoing
		? begin
			? "CLICK"
			: "{Instructions}{footer: click anywhere to next/advance}"
		: init
		? `Your average: ${average}ms` // also add last click time
		: "{Click [anywhere] to Begin}";

	return <p {...props}>{text.toUpperCase()}</p>;
};
