<template>
  <!--Este es el contenedor principal de la cuadricula-->
  <div v-masonry transition-duration="0.3s" item-selector=".grid-item" class="masonry-grid">
    <!--Este es un bucle que crea un nuevo contenedor div para cada imagen
    v-for="(image, index) in images" itera sobre el array de imagenes que recibe el componente, creando un nuevo elemento
    :key="image.id || index" asigna una clave unica a cada elemento del bucle-->
    <div v-masonry-tile class="grid-item" v-for="(image, index) in images" :key="image.id || index">
      <!-- Usa el nombre del componente en kebab-case -->
       <!--pasa el objeto image del bucle v-for como una propiedad al componente imagecard -->
      <!--son escuchadores de eventos el Imagecard emite estos eventos cuando ocurre algo, el imageGrid los re-emite a su componente padre-->
       <image-card 
        :image="image" 
        @image-loaded="onImageLoaded"
        @like-toggled="onLikeToggled"
        @image-click="onImageClick"
      />
    </div>
  </div>
</template>

<script>
// Importa correctamente el componente
import ImageCard from './ImageCard.vue'// importa el componente hijo [ImageCard]

export default {
  name: 'ImageGrid',// nombre del componente
  components: {
    // declara que imagecard esta disponible para su uso
    ImageCard
  },
  props: {// declara la unica propiedad que este componente espera
    images: {
      type: Array,
      required: true,// significa que el componente que use ImageGrid debe pasar este array obligatoreiamente
      default: () => []
    }
  },
  emits: ['image-loaded', 'like-toggled', 'image-click'],//declara los eventos que este componente puede emitir a su padre
  methods: {//son pasarelas cuando un evento se dispara desde el ImageCard, este componente lo atrapa y lo re-emite inmediatamente a su componente padre(this.$emit), solo se encarga de pasar informacion
    onImageLoaded() {
      this.$emit('image-loaded')
    },
    onLikeToggled(likeData) {
      this.$emit('like-toggled', likeData)
    },
    onImageClick(image){
      this.$emit('image-click', image)
    }
  }
}
</script>

<style scoped>
.masonry-grid {
  margin: 0 auto;
}

.grid-item {
  width: calc(25% - 20px);
  margin-bottom: 20px;
}

@media (max-width: 1200px) {
  .grid-item {
    width: calc(33.333% - 20px);
  }
}

@media (max-width: 900px) {
  .grid-item {
    width: calc(50% - 20px);
  }
}

@media (max-width: 600px) {
  .grid-item {
    width: 100%;
  }
}
</style>