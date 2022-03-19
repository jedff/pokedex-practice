const URL = 'https://pokeapi.co/api/v2/pokemon'

const getPokemon = async (evt) => {
  const searchInput = document.getElementById('searchInput')
  const pName = document.getElementById('pName')
  const pImage = document.getElementById('pImage')
  const pTypes = document.getElementById('pTypes')
  const pStats = document.getElementById('pStats')
  const pMoves = document.getElementById('pMoves')

  const pokemon = searchInput.value
  
  const res = await fetch(`${URL}/${pokemon}`)
  const data = await res.json()
 
  pName.innerHTML = ""
  const pokeName = capitalize(data.name)
  const txtName = document.createTextNode(pokeName)
  pName.appendChild(txtName)

  pImage.src = data.sprites.other['official-artwork'].front_default

  pTypes.innerHTML = ""
  const pokeType = data.types.map(t => t.type.name)
  pokeType.forEach(type => {
    const txtType = document.createTextNode(capitalize(type))
    const pType = document.createElement('li')
    pType.appendChild(txtType)
    pTypes.appendChild(pType)
  });

  


  const pokeStats = data.stats.map(s => s)
  pokeStats.forEach((stat, index) => {
    const txtStat = document.createTextNode(stat.base_stat)
    pStats.children[index].children[1].value = stat.base_stat
    pStats.children[index].children[2].innerHTML = ""
    pStats.children[index].children[2].appendChild(txtStat)
  })
  
  
  pMoves.innerHTML = ""
  const pokeMoves = data.moves.map(m => m.move.name)
  pokeMoves.forEach(m => {
    const txtMove = document.createTextNode(capitalize(m))
    const pMove = document.createElement('li')
    pMove.appendChild(txtMove)
    pMoves.appendChild(pMove)
  });


  console.log(pImage)

  searchInput.value = "";

  return data
}

const capitalize = (word) => {
  const cWord = word.replace(/(^\w{1})/g, l => l.toUpperCase())
  return cWord
}
