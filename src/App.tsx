import React, { useState, useEffect } from 'react';
import './App.css';

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

interface ApiResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
}

const App: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://rickandmortyapi.com/api/character');
                const data: ApiResponse = await response.json();
                setCharacters(data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Rick and Morty Characters</h1>
            <div className="card-container">
                {characters.map((character) => (
                    <div className="card" key={character.id}>
                        <img src={character.image} alt={character.name} />
                        <div className="card-content">
                            <h2>{character.name}</h2>
                            <p className={character.status === 'Alive' ? 'alive' : 'dead'}>
                                Status: {character.status}
                            </p>
                            <p>Species: {character.species}</p>
                            <p>Gender: {character.gender}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default App;
