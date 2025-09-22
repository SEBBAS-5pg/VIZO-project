<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">✕</button>
      
      <div class="modal-body">
        <img :src="currentImage.url" :alt="currentImage.title" class="modal-image" />
        
        <div class="modal-info">
          <h2>{{ currentImage.title }}</h2>
          <p>{{ currentImage.description }}</p>
          
          <div class="modal-tags">
            <span v-for="(tag, index) in currentImage.tags" :key="index" class="tag">
              #{{ tag }}
            </span>
          </div>
          
          <div class="modal-actions">
            <button class="modal-btn" @click="downloadImage">
              ⬇️ Descargar
            </button>
            <button class="modal-btn" @click="shareImage">
              ↗️ Compartir
            </button>
            <button class="modal-btn like-btn" :class="{ liked: isLiked }" @click="toggleLike">
              ♥ {{ isLiked ? 'Liked' : 'Like' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    image: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['close', 'download', 'share', 'like-toggled'],
  data() {
    return {
      isLiked: false,
      currentImage: this.image
    }
  },
  watch: {
    image(newImage) {
      this.currentImage = newImage
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    downloadImage() {
      this.$emit('download', this.currentImage)
    },
    shareImage() {
      this.$emit('share', this.currentImage)
    },
    toggleLike() {
      this.isLiked = !this.isLiked
      this.$emit('like-toggled', {
        imageId: this.currentImage.id,
        liked: this.isLiked
      })
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 10;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.modal-info {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.modal-info h2 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.modal-info p {
  color: #7f8c8d;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  flex: 1;
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.modal-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e9ecef;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.modal-btn:hover {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.like-btn.liked {
  background: #ff4757;
  color: white;
  border-color: #ff4757;
}

@media (max-width: 768px) {
  .modal-body {
    grid-template-columns: 1fr;
    max-height: 80vh;
  }
  
  .modal-image {
    height: 200px;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
}
</style>