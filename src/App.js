import React,{useState,useEffect} from 'react';
import './App.css';
import {
    MenuItem,
    Select,
    FormControl
} from "@material-ui/core";

function App(props) {
    const [Countries,setCountries] = useState([])
    const [country,setCountry] = useState("worldwide")
    const data = [props.st.name ,props.st.age]
    console.log(data)
    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }))
                    setCountries(countries)
                })
        }
        getCountriesData();
    },[])

    const onValueChange = (event) =>{
        setCountry(event.target.value)
    }
  return (
    <div className="app">
        <div className="app__header">
     <h1>COVID-19 Tracker</h1>
        <FormControl className = "app__dropdown">
            <Select variant="outlined"
                    onChange={onValueChange}
                    value={country}>
                <MenuItem value="worldwide">WorldWide</MenuItem>
                {Countries.map((country) =>
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                )}
            </Select>
        </FormControl>
    </div>
    </div>
  );
}

export default App;
