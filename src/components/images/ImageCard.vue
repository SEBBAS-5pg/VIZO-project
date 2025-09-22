<template>
  <div class="image-card" :class="{ 'is-liked': isLiked }">
    <div class="image-container" @click="$emit('image-click', image)">
      <img 
        :src="image.url" 
        :alt="image.title"
        @load="$emit('image-loaded')"
        loading="lazy"
      />
      <div class="image-overlay">
        <button class="like-btn" @click.stop="toggleLike">
          <font-awesome-icon :icon="['fas', 'heart']" />
        </button>
      </div>
    </div>
    
    <div class="card-content">
      <h3>{{ image.title }}</h3>
      <p>{{ image.description }}</p>
      
      <div class="tags">
        <span v-for="(tag, index) in image.tags" :key="index" class="tag">
          #{{ tag }}
        </span>
      </div>
      
      <div class="card-actions">
        <button class="action-btn download-btn" @click="$emit('download', image)">
          <font-awesome-icon :icon="['fas', 'download']" /> Descargar
        </button>
        <button class="action-btn share-btn" @click="$emit('share', image)">
          <font-awesome-icon :icon="['fas', 'share-nodes']" /> Compartir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCamera, faDownload, faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons'

library.add(faHeart, faCamera, faDownload, faShareNodes);

export default {
  name: 'ImageCard',
  components: {
    FontAwesomeIcon
  },
  props: {
    image: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  emits: ['image-loaded', 'like-toggled', 'image-click', 'download', 'share'],
  data() {
    return {
      isLiked: false
    }
  },
  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked
      this.$emit('like-toggled', {
        imageId: this.image.id,
        liked: this.isLiked
      })
    }
  }
}
</script>

<style scoped>
/* Definición de la paleta de colores como variables CSS */
:root {
  --color-black: #000000;
  --color-dark-blue: #14213D;
  --color-orange: #FCA311;
  --color-light-gray: #E5E5E5;
  --color-white: #FFFFFF;
}

.image-card {
  /* Fondo de la tarjeta: azul oscuro para destacar sobre el fondo negro de la app */
  background: var(--color-dark-blue);
  border-radius: 12px;
  overflow: hidden;
  /* Sombra para darle profundidad y que resalte del fondo */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-card:hover {
  /* Efecto para levantar la tarjeta al pasar el cursor */
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
}

.image-container {
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.image-container:hover img {
  /* Zoom al pasar el cursor sobre la imagen */
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px;
}

.like-btn {
  background: var(--color-orange);
  color: var(--color-dark-blue);
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 1.4rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.like-btn:hover {
  background: var(--color-light-gray);
  color: var(--color-orange);
  transform: scale(1.15);
}

/* Estilo para el botón de 'me gusta' cuando ya se le ha dado clic */
.image-card.is-liked .like-btn {
  background: var(--color-dark-blue);
  color: var(--color-orange);
}

.card-content {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-content h3 {
  margin: 0 0 8px 0;
  /* Título en blanco para que se lea mejor */
  color: var(--color-white);
  font-weight: bold;
}

.card-content p {
  /* Descripción en gris para un contraste suave */
  color: var(--color-light-gray);
  margin: 0 0 10px 0;
  font-size: 0.9rem;
}

.photographer {
  /* Texto del fotógrafo en gris */
  color: var(--color-light-gray);
  font-size: 0.8rem;
  margin-bottom: 10px;
}

.photographer-link {
  /* Enlace del fotógrafo en naranja para que resalte */
  color: var(--color-orange);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.photographer-link:hover {
  color: var(--color-light-gray);
  text-decoration: underline;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 15px;
}

.tag {
  /* Fondo de las etiquetas en azul oscuro para unificar */
  background: var(--color-dark-blue);
  color: var(--color-white);
  padding: 4px 8px;
  border: 1px solid var(--color-orange);
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.action-btn {
  /* Botones de acción con fondo de acento naranja */
  background: var(--color-orange);
  color: var(--color-dark-blue);
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  flex-grow: 1;
  margin: 0 5px;
}

.action-btn:first-child {
  margin-left: 0;
}

.action-btn:last-child {
  margin-right: 0;
}

.action-btn:hover {
  /* Cambio de color al pasar el cursor */
  background: var(--color-light-gray);
  color: var(--color-orange);
  transform: translateY(-2px);
}
</style>