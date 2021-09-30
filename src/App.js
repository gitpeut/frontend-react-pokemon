import React from 'react';
import {useState, useEffect} from "react";
import axios from 'axios';
import Card from "./components/card/Card";
import './App.css';



function App() {
    const [pokemonList, setPokemonList] = useState({});
    const [pokemonUrl, setPokemonUrl] = useState('https://pokeapi.co/api/v2/pokemon/');

    useEffect(
        () => {
            async function fetchData() {
                let result = {};
                //console.log("fetch data ");
                try {
                    result = await axios.get(pokemonUrl);
                    //console.log(result.data);

                    let list = {};
                    list.count = result.data.count;
                    list.next = result.data.next;
                    list.previous = result.data.previous;

                    list.urls = result.data.results.map((result) => {
                            return (result.url);
                        }
                    );
                    //console.log(list);
                    setPokemonList(list);
                    document.title = "PokéApi"
                } catch (e) {
                    console.log(`Fetch data from pokeapi failed ${e}`);
                }
            }

            if (pokemonUrl) fetchData();
        },
        [pokemonUrl]
    );


    return (
        <div className="app-div">
            <img className="logo" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                 alt="PokeApilogo"/>
            {Object.keys(pokemonList).length <= 0 && <h3>Loading data...</h3>}
            <div>
                {Object.keys(pokemonList).length > 0 &&
                pokemonList.urls.map((url) => {
                    // url van een Card eindigt op bv.  /1/
                    // dat cijfer halen we eruit met split.
                    const spliturl = url.split('/');
                    const splitlen = spliturl.length;
                    const key = `card-${spliturl[splitlen - 2]}`;
                    return (<Card pokemonUrl={url} key={key} />);
                })

                }
            </div>

            {Object.keys(pokemonList).length > 0 &&
            <div className="button-div">
                <button
                    type="button"
                    disabled={!pokemonList.previous}
                    onClick={() => {
                        setPokemonUrl(pokemonList.previous);
                    }}
                >Previous
                </button>

                <button
                    type="button"
                    disabled={!pokemonList.next}
                    onClick={() => {
                        setPokemonUrl(pokemonList.next)
                    }}
                >Next
                </button>
            </div>
            }
        </div>
    );
}

export default App;
