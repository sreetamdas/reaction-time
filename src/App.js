import React, { useState, useEffect } from "react";
import "./App.css";
// import styled from "styled-components";
import { ClickArea, Text } from "./StyledComponents";

const App = () => {
	const [clickState, setClickState] = useState(true);
	// const [average, setAverage] = useState(0);
	const [clicks, setClicks] = useState([]);
	const [start, setStart] = useState(false);
	const [init, setInit] = useState(false);
	const [ongoing, setOngoing] = useState(false);
	const [begin, setBegin] = useState(false);
	// const [text, setText] = useState("Start");
	const [average, setAverage] = useState(0);

	useEffect(() => {
		const timestamp = Date.now();
		if (!clickState && start && ongoing) {
			setClicks(clicks => {
				return [...clicks, timestamp];
			});
		}
		if (!clickState || !start || !ongoing) {
			return;
		}
		const minimum = 2000,
			maximum = 5000;
		const rand =
			Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
		console.log(`Changing after ${rand}ms`);
		let timer = setTimeout(() => setClickState(false), rand);
		setOngoing(true);
		return () => {
			clearTimeout(timer);
		};
	}, [clickState, ongoing, start]);

	useEffect(() => {
		if (!init) {
			return undefined;
		}
		const clicks_array = [...clicks];
		const average = clicks_array.reduce((total, value, index, array) => {
			total += value;
			if (index === array.length - 1) {
				return total / array.length;
			} else {
				return total;
			}
		});
		setAverage(average);
	}, [clicks, init]);

	const recordClick = timestamp => {
		let clicks_array = [...clicks];

		const time_to_react = timestamp - clicks_array.slice(-1)[0];

		clicks_array.pop();
		if (!clicks_array.length) {
			setBegin(true);
		}
		if (clicks_array.length === 1 && !init) {
			clicks_array = [];
			setInit(true);
		}
		clicks_array.push(time_to_react);

		setClicks(clicks_array);
	};

	const handleClick = e => {
		// First click from user to start the benchmark
		if (!start) {
			setStart(true);
			setOngoing(true);
			setClickState(false);
		}
		if (!clickState && ongoing) {
			recordClick(Date.now());
		}

		// handle ongoing session, clicked to start, red now
		if (!ongoing) {
			// no color change na?
			setOngoing(true);
			setClickState(!clickState);
			return;
		}

		setOngoing(false);
	};
	useEffect(() => {}, [clicks]);
	return (
		<div className="App">
			<ClickArea
				onClick={e => handleClick(e)}
				states={[clickState, start, clicks.length]}
				// background={
				// 	clickState
				// 		? !start
				// 			? "black"
				// 			: "#ef4b4b"
				// 		: clicks.length <= 1
				// 		? "black"
				// 		: "#47e4bb"
				// }
			>
				<Text
					states={[clickState, start, ongoing, begin, init, average]}
				/>
			</ClickArea>
		</div>
	);
};

export default App;
