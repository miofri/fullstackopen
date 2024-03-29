import { useState, useEffect } from 'react'
import axios from 'axios';

const api_key = process.env.REACT_APP_WEATHER_ID

const FindCountries = ({ handleFindCountriesOnChange }) => {
	return (
		<div>
			Find countries: <input onChange={handleFindCountriesOnChange} />
		</div>
	)
}

const ListCountries = ({ filteredCountry, allCountries }) => {
	if (filteredCountry.length > 10) {
		return (
			<p>Too many matches, specify another filter.</p>
		)
	}
	else if (filteredCountry.length < 1) {
		return (
			<p>No match found.</p>
		)
	}
	else if (filteredCountry.length === 1) {
		return (
			<DetailedResult allCountries={allCountries} filteredCountry={filteredCountry[0]} />
		)
	}
	return (
		<ul style={{
			listStyle: "none"
		}}>
			{filteredCountry.map(x =>
				<ButtonDetails key={x} x={x} allCountries={allCountries} />)
			}
		</ul >
	)
}

// Each button component now has their own localised use state
const ButtonDetails = ({ x, allCountries }) => {
	const [ButtonDetails, setButtonDetails] = useState(false)
	return (
		<li key={x}>{x}<br></br>
			<button onClick={() => handleCountryClick(ButtonDetails, setButtonDetails)}>show details</button>
			{ButtonDetails ?
				<DetailedResult filteredCountry={x} allCountries={allCountries} /> : <div></div>
			} <br></br>
		</li>
	)
}

const DetailedResult = ({ allCountries, filteredCountry }) => {
	let countryDetails = allCountries.filter(x => x.name.official.includes(filteredCountry))
	countryDetails = countryDetails[0]

	// console.log(countryDetails);

	let capital = countryDetails.capital
	if (capital.length > 1) {
		capital = countryDetails.capital.map(x => <li key={x}>{x}</li>)
	}

	let area = countryDetails.area

	let languages = Object.values(countryDetails.languages).map(x => <li key={x}>{x}</li>)

	let latlng = countryDetails.latlng

	return (
		<div>
			<h2>{countryDetails.name.official}</h2>
			<p>Capital:</p>
			<ul>
				{capital}
			</ul>
			<p>Area: {area}</p>
			<p><b>Languages:</b></p>
			<ul>
				{languages}
			</ul>
			<p>Flag:</p>
			<img alt={countryDetails.name.official} width="250px" src={countryDetails.flags.svg} />
			<br></br>
			<WeatherApp latlng={latlng} />
		</div>
	)
}

const handleCountryClick = (showMe, setShowMe) => {
	return (setShowMe(showMe => !showMe))
}

const WeatherApp = ({ latlng }) => {
	const [tempDetails, setTempDetails] = useState('')

	let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`

	useEffect(() => {
		axios
			.get(weatherURL)
			.then(response => {
				setTempDetails(response.data)
			})
	}, [weatherURL])

	if (tempDetails.name !== undefined) {
		let weatherIcon = `http://openweathermap.org/img/wn/${tempDetails.weather[0].icon}@2x.png`

		return (
			<div>
				<h2>Weather in {tempDetails.name}</h2>
				<p>Temperature: {tempDetails.main.temp} celcius</p>
				<img src={weatherIcon} alt='weather icon' />
				<p>Wind: {tempDetails.wind.speed} m/s</p>
			</div>
		)
	}
}

const App = () => {
	const [allCountries, setAllCountries] = useState([])
	const [countriesName, setCountriesName] = useState([])
	const [findCountry, setFindCountry] = useState('')

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				setAllCountries(response.data)
			})
	}, [])

	const handleFindCountriesOnChange = (event) => {
		setCountriesName(allCountries.map(x => x.name.official))
		setFindCountry(event.target.value)
	}

	const filteredCountry = countriesName.filter(x => x.toLowerCase().includes(findCountry.toLocaleLowerCase()))

	return (
		<div>
			<FindCountries handleFindCountriesOnChange={handleFindCountriesOnChange} />
			<ListCountries filteredCountry={filteredCountry} allCountries={allCountries} />
		</div>
	)
}

export default App;
