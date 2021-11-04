

const BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny';
const imageIds = [3, 3, 5, 5, 6, 6, 9, 9, 12, 12, 14, 14]

export const getImages = () => [...imageIds.sort(() => 0.5 - Math.random())].map(id => ({id, url: `${BASE_URL}/${id}.png`}));