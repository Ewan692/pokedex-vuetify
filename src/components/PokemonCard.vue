<template>
  <v-card
    :to="`/pokemon/${pokemon.id}`"
    hover
  >
    <v-img
      :src="getImageUrl(pokemon.img)"
      :alt="pokemon.name"
      height="200"
      cover
    />
    <v-card-title>{{ pokemon.name }}</v-card-title>
    <v-card-subtitle>Niveau {{ pokemon.level }}</v-card-subtitle>
  </v-card>
</template>

<script setup>
import { getImageUrl } from '@/utils/imageUrl'

defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})
</script>
