<template>
  <v-container>
    <!--
    Bouton retour
      * Permet de revenir à la page précédente
    -->
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-4"
      @click="$router.back()"
    >
      Retour
    </v-btn>

    <!-- Skeleton pendant le chargement -->
    <v-skeleton-loader
      v-if="pokemonStore.isLoading"
      type="card, article"
      max-width="800"
      class="mx-auto"
    />

    <!-- Message si le Pokémon n'est pas trouvé (après chargement) -->
    <v-alert
      v-else-if="!pokemon"
      type="error"
      variant="tonal"
    >
      Pokémon non trouvé.
    </v-alert>

    <!--
    Affichage détaillé du Pokémon
      * v-if="pokemon" vérifie que le Pokémon existe avant de l'afficher
    -->
    <v-card
      v-else-if="pokemon"
      max-width="800"
      class="mx-auto"
    >
      <!--
      Image du Pokémon en grand format
        * height="300" pour une image plus grande que sur la carte
      -->
      <v-img
        :src="getImageUrl(pokemon.img)"
        :alt="pokemon.name"
        height="300"
        cover
      />

      <v-card-title class="text-h4">
        {{ pokemon.name }}
      </v-card-title>

      <v-card-subtitle>
        Niveau {{ pokemon.level }}
      </v-card-subtitle>

      <v-card-text>
        <!-- Description du Pokémon -->
        <p
          v-if="pokemon.description"
          class="text-body-1 mb-4"
        >
          {{ pokemon.description }}
        </p>

        <!--
        Types du Pokémon (chips colorés)
          * Composant réutilisable PokemonTypesChips
        -->
        <div
          v-if="pokemon.types && pokemon.types.length"
          class="mb-4"
        >
          <strong class="mr-2">Types :</strong>
          <pokemon-types-chips :types="pokemon.types" />
        </div>

        <!--
        Statistiques du Pokémon (barres de progression)
          * Composant réutilisable PokemonStats
        -->
        <div v-if="pokemon.stats">
          <strong class="d-block mb-2">Statistiques :</strong>
          <pokemon-stats :stats="pokemon.stats" />
        </div>
      </v-card-text>

      <!--
      Actions : favori et supprimer
      -->
      <v-card-actions>
        <!-- Bouton favori -->
        <v-btn
          :icon="pokemonStore.isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline'"
          :color="pokemonStore.isFavorite(pokemon) ? 'red' : ''"
          variant="text"
          @click="pokemonStore.toggleFavorite(pokemon)"
        />

        <v-spacer />

        <!--
        Bouton supprimer (visible uniquement si connecté)
          * Ouvre un dialogue de confirmation avant la suppression
        -->
        <v-btn
          v-if="authStore.isAuthenticated"
          color="error"
          variant="text"
          prepend-icon="mdi-delete"
          @click="showDeleteDialog = true"
        >
          Supprimer
        </v-btn>
      </v-card-actions>
    </v-card>

    <!--
    Dialogue de confirmation de suppression
      * v-model contrôle l'ouverture/fermeture
      * max-width="400" limite la largeur
    -->
    <v-dialog
      v-model="showDeleteDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title>Confirmer la suppression</v-card-title>
        <v-card-text>
          Êtes-vous sûr de vouloir supprimer <strong>{{ pokemon?.name }}</strong> ?
          Cette action est irréversible.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="showDeleteDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            :loading="pokemonStore.isLoading"
            @click="handleDelete"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--
    Snackbar pour les messages de confirmation
    -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { usePokemonStore } from '@/stores/pokemonStore'
import { useAuthStore } from '@/stores/authStore'
import { getImageUrl } from '@/utils/imageUrl'
import PokemonTypesChips from '@/components/PokemonTypesChips.vue'
import PokemonStats from '@/components/PokemonStats.vue'

/**
 * Récupération de l'ID du Pokémon depuis les paramètres de la route
 * useRoute() est auto-importé grâce à unplugin-auto-import
 */
const route = useRoute()
const router = useRouter()
const pokemonStore = usePokemonStore()
const authStore = useAuthStore()

/**
 * Computed qui récupère le Pokémon correspondant à l'ID de la route
 * Se met à jour automatiquement si l'ID change
 */
const pokemon = computed(() => {
  return pokemonStore.getPokemonById(route.params.id)
})

/**
 * État du dialogue de suppression
 */
const showDeleteDialog = ref(false)

/**
 * État du snackbar
 */
const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
})

/**
 * Gère la suppression du Pokémon
 * 1. Appelle le store pour supprimer via l'API
 * 2. Affiche un message de confirmation
 * 3. Redirige vers l'accueil si succès
 */
async function handleDelete () {
  const result = await pokemonStore.deletePokemon(route.params.id)

  showDeleteDialog.value = false

  snackbar.value = {
    show: true,
    message: result.message,
    color: result.success ? 'success' : 'error',
  }

  if (result.success) {
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
}
</script>
