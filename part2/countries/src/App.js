import { useState, useEffect } from 'react'
import axios from 'axios';

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
		filteredCountry.map(x => <li key={x}>{x}</li>)
	)
}

const DetailedResult = ({ allCountries, filteredCountry }) => {
	let countryDetails = allCountries.filter(x => x.name.official.includes(filteredCountry))
	countryDetails = countryDetails[0]

	let capital = countryDetails.capital
	if (capital.length > 1) {
		capital = countryDetails.capital.map(x => <li>{x}</li>)
	}

	let area = countryDetails.area

	let languages = Object.values(countryDetails.languages).map(x => <li key={x}>{x}</li>)

	console.log(countryDetails);
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

		</div>
	)
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
		// console.log(findCountry);
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
