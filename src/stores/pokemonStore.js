import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    // données ici
    pokemons: [],
    types: [],
    isLoading: false,
    error: null,
  }),
  getters: {
    // données calculées ici
    totalPokemons: (state) => state.pokemons.length,

    getPokemonById: (state) => {
      return (pokemonId) => {
        return state.pokemons.find(p => p.id === pokemonId)
      }
    },
  },
  actions: {
    // fonctions ici
    async fetchPokemons() {
      const reponse = await fetch('http://localhost:3535/pokemons')
      // Si erreur on s'arrête et affiche une erreur
      if (!reponse.ok) {
        throw new Error(`Erreur HTTP : ${reponse.status}`)
      }
      // Transfomre le JSON en JS et le stocke dans le magasin
      this.pokemons = await reponse.json()
    },

    async fetchTypes() {
      const reponse = await fetch('http://localhost:3535/types')
      // Si erreur on s'arrête et affiche une erreur
      if (!reponse.ok) {
        throw new Error(`Erreur HTTP : ${reponse.status}`)
      }
      // Transfomre le JSON en JS et le stocke dans le magasin
      this.types = await reponse.json()
    },

    // Initialise les données du magasin depuis l'API
    async init() {
      this.isLoading = true
      try {
        await Promise.all([
          this.fetchPokemons(),
          this.fetchTypes(),
        ])
      } catch (error) {
        this.error = 'Erreur lors du chargement des données'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
