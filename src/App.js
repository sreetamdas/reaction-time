import React, { useState, useEffect } from "react";
// import useTimeout from "use-timeout";
import "./App.css";

// import { ClickArea } from "./Components";

const App = () => {
	const [clickState, setClickState] = useState(true);
	// const [average, setAverage] = useState(0);
	const [clicks, setClicks] = useState([]);
	const [start, setStart] = useState(false);
	const [init, setInit] = useState(false);
	const [ongoing, setOngoing] = useState(false);
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
			console.log("init");

			return undefined;
		}
		console.log("computing average");
		const clicks_array = [...clicks];
		const average = clicks_array.reduce((total, value, index, array) => {
			console.log({ total }, { value }, { index }, { array });

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
			setClickState(false);
		}
		if (!clickState && ongoing) {
			recordClick(Date.now());
		}

		// handle ongoing session
		if (!ongoing) {
			// no color change na?
			setClickState(!clickState);
		}

		setOngoing(!ongoing);
	};
	useEffect(() => {}, [clicks]);
	return (
		<div className="App">
			<div
				className="ClickArea"
				style={{
					backgroundColor: clickState
						? !start
							? "black"
							: "#ef4b4b"
						: clicks.length <= 1
						? "black"
						: "#47e4bb",
				}}
				onClick={e => handleClick(e)}
			>
				{clickState
					? start
						? "I'M RED"
						: "GENESIS"
					: ongoing
					? init
						? "CLICK"
						: "BOUT TO START"
					: init
					? `Your average: ${average}ms`
					: "HERE WE GO"}
			</div>
		</div>
	);
};

export default App;
