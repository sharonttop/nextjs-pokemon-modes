
/* eslint-disable @next/next/no-img-element */
// 以上為一個可以讓eslint消失的註解
import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
interface PokemonType {
  id: number
  image: string
  name: string
}

//SSR
export async function getServerSideProps() {
  const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
  // console.log('pokemon的結果',resp)
  const pokemons = await resp.json()
  // console.log('pokemons getServerSideProps',pokemons)

  return {
    props:{
      pokemons
    }
  }
  
}

export default function Home(props:any) {  
  // console.log('pokemon function',pokemons)
  const pokemons:PokemonType[] = props.pokemons
  /*
  // CSR
  const [pokemon, setPokemon] = useState<PokemonType[]>([])

  useEffect(() => {
  async function getPokemon() {
    const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
    setPokemon(await resp.json())  
    }
    getPokemon()
  }, [])
  */

  return (
    <div className={styles.container}>
      <Head>
        <title>ポケモン図鑑</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemons.map((pokemon)=>(
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name}
                />
              <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <div>{JSON.stringify(pokemons)}</div>
    </div>
  )
}
