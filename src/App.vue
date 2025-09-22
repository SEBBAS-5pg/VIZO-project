<template>
  <div id="app">
    <AppHeader 
      :search-query="searchQuery"
      @search="performSearch"
      @show-upload="handleShowUpload"
      @show-favorites="handleShowFavorites"
    />
    
    <main class="main-content">
      <div class="container">
        <ImageGrid 
          :images="filteredImages"
          @image-loaded="redrawMasonry"
        />
        
        <LoadMoreButton 
          :loading="isLoading"
          @load-more="loadMoreImages"
          v-if="!searchQuery"
        />
      </div>
    </main>
    
    <AppFooter @nav-to="handleNavTo" />
  </div>
</template>

<script>
// Importamos los composables y los componentes
import { useImages } from './composables/useImages'
import { useSearch } from './composables/useSearch'
import AppHeader from './components/layout/Header.vue'
import AppFooter from './components/layout/Footer.vue'
import ImageGrid from './components/images/ImageGrid.vue'
import LoadMoreButton from './components/ui/LoadMoreButton.vue'
import { onMounted, watch } from 'vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ImageGrid,
    LoadMoreButton
  },
  setup() {
    // Usamos los composables para obtener la lógica reactiva
    const { images, isLoading, loadMoreImages } = useImages()
    const { searchQuery, filteredImages, performSearch } = useSearch(images)

    // Lógica para redibujar el layout de Masonry
    const redrawMasonry = () => {
      // Usamos el nextTick de Vue para asegurarnos de que el DOM se actualice
      // antes de redibujar la cuadrícula.
      // Aquí, asumimos que tienes una función global o plugin para masonry.
      if (typeof window.$redrawVueMasonry === 'function') {
        window.$redrawVueMasonry()
      }
    }

    // Usamos watch para observar cambios en filteredImages y redibujar
    watch(filteredImages, () => {
      redrawMasonry()
    })

    // Se ejecuta una vez que el componente se ha montado en el DOM
    onMounted(() => {
      redrawMasonry()
    })
    
    // Métodos para manejar los eventos de los componentes
    const handleShowUpload = () => {
      alert('¡Acción de subir imagen!')
      // Lógica real para mostrar un modal de subida o navegar a otra página
    }

    const handleShowFavorites = () => {
      alert('¡Navegando a favoritos!')
      // Lógica real para navegar a la vista de favoritos
    }
    
    const handleNavTo = (page) => {
      alert(`¡Navegando a la página de ${page}!`)
      // Lógica real para manejar la navegación del router
    }

    // Devolvemos las propiedades y métodos para la plantilla
    return {
      isLoading,
      searchQuery,
      filteredImages,
      loadMoreImages,
      performSearch,
      redrawMasonry,
      handleShowUpload,
      handleShowFavorites,
      handleNavTo
    }
  }
}
</script>

<style>
/* Estilos globales */
:root {
  --color-dark: #14213D;
  --color-accent: #FCA311;
  --color-light: #E5E5E5;
  --color-white: #FFFFFF;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #000000;
  color: #E5E5E5;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 0 20px 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>