import React, { useEffect, useState } from 'react';

export const App = () => {
	const [champion, setChampion] = useState('Aatrox');
	const [skinsToIterate, setSkinsToIterate] = useState({});
	const [counter, setCounter] = useState(1);
	const [num, setNum] = useState(0);
	const [inputValue, setInputValue] = useState('');

	const src = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_${num}.jpg`;

	useEffect(() => {
		const fetchChampionInfo = async () => {
			const url = `http://ddragon.leagueoflegends.com/cdn/10.18.1/data/en_US/champion/${champion}.json`;
			const res = await fetch(url);
			const json = await res.json();
			const data = await json;

			const { data: championData } = data;
			const { [champion]: championName } = championData;

			console.log(championName.skins);
			setSkinsToIterate(championName.skins);
		};

		fetchChampionInfo();
	}, [champion]);

	const handleClick = () => {
		if (counter === skinsToIterate.length - 1) {
			setCounter(0);
		} else {
			setCounter(counter + 1);
		}

		console.log(skinsToIterate[counter]);
		console.log(counter);

		setNum(skinsToIterate[counter].num);
	};

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setCounter(1);
		setNum(0);
		setChampion(inputValue);
	};

	return (
		<div>
			<h1>This champion is: {champion}</h1>
			<form onSubmit={handleSubmit}>
				<input value={inputValue} onChange={handleChange}></input>
				<button type="submit">Search</button>
			</form>
			<button onClick={handleClick}>Change Skin</button>
			<div>
				<img src={src} />
			</div>
		</div>
	);
};
