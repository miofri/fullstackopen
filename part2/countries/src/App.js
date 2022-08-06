import { useState, useEffect } from 'react'
import axios from 'axios';

const FindCountries = ({ handleFindCountriesOnChange }) => {
	return (
		<div>
			find countries <input onChange={handleFindCountriesOnChange} />
		</div>
	)
}

const ListCountries = ({ filteredCountry }) => {
	if (filteredCountry.length > 10) {
		return (
			<p>Too many matches, specify another filter</p>
		)
	}
	return (
		filteredCountry.map(x => <li key={x}>{x}</li>)
	)
}

function App() {
	const [allCountries, setAllCountries] = useState('')
	const [countriesName, setCountries] = useState([])
	const [findCountry, setFindCountry] = useState('')
	const [capital, setCapital] = useState('')
	const [area, setArea] = useState('')
	const [languages, setLanguages] = useState([])

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				console.log('promise fulfilled');
				setAllCountries(response.data)
				console.log(allCountries);
				setCountries(response.data.map(x => x.name.common))
				// setCapital(response.data.map(x => x.capital))
				// setArea(response.data.map(x => x.area))
				// setLanguages(response.data.languages)
			})
	}, [])

	const handleFindCountriesOnChange = (event) => {
		setFindCountry(event.target.value)
		console.log(findCountry);
	}

	const filteredCountry = countriesName.filter(x => x.includes(findCountry))


	console.log(test);
	return (
		<div>
			<FindCountries handleFindCountriesOnChange={handleFindCountriesOnChange} />
			<ListCountries filteredCountry={filteredCountry} />
		</div>
	)
}

export default App;
