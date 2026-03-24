<template>
  <v-container>
    <!--
    Titre de la page À propos
      * text-h3 applique le style titre de niveau 3
      * text-center centre le texte horizontalement
      * my-6 ajoute une marge verticale
    -->
    <h1 class="text-h3 text-center my-6">
      À propos
    </h1>

    <!--
    Carte d'information sur le Pokédex
      * max-width="800" limite la largeur de la carte
      * class="mx-auto" centre la carte horizontalement
    -->
    <v-card
      max-width="800"
      class="mx-auto"
    >
      <v-card-text>
        <p class="text-body-1 mb-4">
          Le <strong>Pokédex</strong> est une encyclopédie électronique portable conçue pour
          cataloguer et fournir des informations sur les différentes espèces de Pokémon.
        </p>
        <p class="text-body-1 mb-4">
          Cette application web a été développée dans le cadre du cours <strong>C141</strong>
          à l'ESIG, en utilisant <strong>Vue.js 3</strong>, <strong>Vuetify 3</strong>,
          <strong>Pinia</strong> et <strong>Axios</strong>.
        </p>
        <p class="text-body-1 mb-4">
          Elle permet de consulter, rechercher, filtrer et gérer une collection de Pokémon,
          avec un système de favoris et d'authentification.
        </p>
      </v-card-text>

      <!-- Bouton pour ouvrir la carte de Kanto -->
      <v-card-actions>
        <v-btn
          color="primary"
          variant="text"
          @click="showMap = true"
        >
          Voir la carte de Kanto
        </v-btn>
      </v-card-actions>
    </v-card>

    <!--
    Dialogue affichant la carte de Kanto
      * v-model contrôle l'ouverture/fermeture
      * max-width="800" limite la largeur
    -->
    <v-dialog
      v-model="showMap"
      max-width="800"
    >
      <v-card>
        <v-card-title>Carte de Kanto</v-card-title>
        <v-img
          :src="getImageUrl('pokemon-map.png')"
          alt="Carte de la région de Kanto"
        />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            variant="text"
            @click="showMap = false"
          >
            Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { getImageUrl } from '@/utils/imageUrl'

/**
 * État local pour contrôler l'affichage du dialogue de la carte
 * ref() est auto-importé grâce à unplugin-auto-import
 */
const showMap = ref(false)
</script>
