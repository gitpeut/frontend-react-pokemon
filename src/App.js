import React from 'react';
import { useState, useEffect} from "react";
import axios from 'axios';
import Card from "./components/card/Card";
import './App.css';


function App() {
const [ pokemonList, setPokemonList ] = useState({});
const [ pokemonUrl, setPokemonUrl] = useState( 'https://pokeapi.co/api/v2/pokemon/' ) ;

    useEffect (
        ()=>{
            async function fetchData( ){
                let result={};
                //console.log("fetch data ");
                try{
                    result = await axios.get( pokemonUrl );
                    //console.log(result.data);

                    let list = {};
                    list.count = result.data.count;
                    list.next  = result.data.next;
                    list.previous = result.data.previous;

                    list.idxs  = result.data.results.map( ( result )=> {
                            const spliturl = result.url.split('/');
                            const splitlen = spliturl.length;

                            //console.log( ' spliturl ' + spliturl[ splitlen - 2 ] );
                            return( spliturl[ splitlen -2 ] );
                        }
                    );

                    setPokemonList( list );
                    document.title="PokéApi"
                }catch (e){
                    console.log(`Fetch data from pokeapi failed ${e}`  );
                }
            }

            if ( pokemonUrl  )fetchData();
        },
        [pokemonUrl]
    );


    return (
    <div className="app-div">
        <img className="logo" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokeApilogo"/>
        {Object.keys(pokemonList).length <= 0 && <h3>Loading data...</h3>}
        <div>
            { Object.keys(pokemonList).length > 0 &&
              pokemonList.idxs.map( ( number )=>{
                  let key = `card${number}`;
                  return( <Card pokemonIdx={number} key={key} /> );
            })

            }

        </div>

        { Object.keys(pokemonList).length > 0 &&
            <div className="button-div">
            <button
                type="button"
                disabled = { !pokemonList.previous}
                onClick={ ()=>{
                    setPokemonUrl( pokemonList.previous );
                }}
            >Previous</button>

            <button
                type="button"
                disabled = { !pokemonList.next}
                onClick={ ()=>{
                    setPokemonUrl( pokemonList.next )
                }}
            >Next</button>
            </div>
        }
    </div>
  );
}

export default App;
