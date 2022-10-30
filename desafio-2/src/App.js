import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";



function App() {

	let currentCC; //country code do pais atualmente selecionado
	let currentCountry;

	const [countriesList, setCountriesList] = useState([]);
	const [citiesList, setCitiesList] = useState([]);
	

	const cityRes = Axios.get(
		`https://amazon-api.sellead.com/city`
	);



	//recebe paises pela API da amazon
	const getCountries = async () => {
		const countryRes = await Axios.get(
			`https://amazon-api.sellead.com/country`
		);
	  let countries = [];
	  countryRes.data.forEach((data) => {
		countries.push(data.name);
	  });
	  setCountriesList(countries);

	};

	

	const getCities = async() => 
	{
		let cities = [];
		const cityRes = await Axios.get(
			`https://amazon-api.sellead.com/city`
		);
		await getCC();
		cityRes.data.forEach((data) => {
			if (data.country_code == currentCC)
			{
				cities.push(data.name);
			}
		});
		setCitiesList(cities);
	};



	const getCC = async()  => //get country code
	{
		const countryRes = await Axios.get(`https://amazon-api.sellead.com/country`);
		countryRes.data.forEach((data) => {
			if (data.name == currentCountry)
			{
				currentCC = data.code;
			}
		});
	};



	const handleChange = async(e) => {
		currentCountry = e.target.value;
		await getCities();
		
	};


	useEffect(() => {
	  getCountries();
	}, []);




	return (
		<div className="App">	
		<header className="App-header">


			<form>

				<label>
					Nome *<br></br>
					<input type="text" name="nome" required/>
				</label>


				<br></br>
				
				<label>
					Email *<br></br>
					<input type="email" name="email" required/>
				</label>


				<br></br>

				<label>
					Telefone *<br></br>
					<input type="text" name="telefone" required/>
				</label>


				<br></br>

				<label>
					CPF *<br></br>
					<input type="text" name="cpf" required/>
				</label>


				<br></br>

				<label>	
					País *<br></br>
					<select onChange={handleChange} required>
						{countriesList.map((data, i) => (
						<option key={i} value={data}>
							{data}
						</option>
						))}
					</select>
				</label>


				<br></br>

				<label>	
					Cidade *<br></br>
					<select required>
						{citiesList.map((data, i) => (
						<option key={i} value={data}>
							{data}
						</option>
						))}
					</select>
				</label>


				<br></br>

				<input type="submit" value="Enviar" />


			</form>


			
		</header>
		</div>
	);
}

export default App;
