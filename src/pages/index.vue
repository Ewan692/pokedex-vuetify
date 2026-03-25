<template>
  <!-- Conteneur principal pour structurer la disposition de la page -->
  <v-container>
    <!--
    Titre de la page
      * text-h3 applique le style titre de niveau 3
      * text-center permet de centrer le texte
      * my-6 ajoute une marge verticale de 6 unités
    -->
    <h1 class="text-h3 text-center my-6">
      Pokédex
    </h1>

    <!-- TODO: Afficher les Pokémon ici -->
    <v-row>
      <v-col
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-img
            :src="getImageUrl(pokemon.img)"
            height="200"
            cover
          />

          <v-card-title>
            {{ pokemon.name }}
          </v-card-title>

          <v-card-subtitle>
            Niveau {{ pokemon.level }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import {getImageUrl} from "@/utils/imageUrl";

  const pokemons = ref([])

  onMounted(async () => {
    const res = await fetch('http://localhost:3535/pokemons')
    pokemons.value = await res.json()

    console.log(pokemons.value)
  })
</script>
