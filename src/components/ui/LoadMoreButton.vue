<template>
  <div class="load-more-container">
    <button
      :class="['load-more-btn', { loading }]"
      :disabled="loading"
      @click="$emit('load-more')"
    >
      <span v-if="!loading" class="btn-content">
        <span class="btn-icon">🔄</span>
        {{ buttonText }}
      </span>
      <span v-else class="loading-content">
        <span class="spinner"></span>
        Cargando...
      </span>
    </button>
    
    <div v-if="showScrollHint" class="scroll-hint">
      <span class="hint-icon">👇</span>
      <p>Sigue desplazando para ver más contenido</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadMoreButton',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: 'Cargar más imágenes'
    },
    showScrollHint: {
      type: Boolean,
      default: false
    }
  },
  emits: ['load-more']
}
</script>

<style scoped>
.load-more-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 3rem 0;
  padding: 0 1rem;
}

.load-more-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
  min-width: 200px;
}

.load-more-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.load-more-btn:active:not(:disabled) {
  transform: translateY(-1px);
}

.load-more-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.load-more-btn.loading {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.btn-content, .loading-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.load-more-btn:hover .btn-icon {
  transform: rotate(180deg);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.scroll-hint {
  text-align: center;
  color: #666;
  animation: bounce 2s infinite;
}

.hint-icon {
  font-size: 24px;
  display: block;
  margin-bottom: 8px;
}

.scroll-hint p {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Efecto de onda al hacer clic */
.load-more-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.load-more-btn:active::after {
  width: 300px;
  height: 300px;
}

/* Responsive */
@media (max-width: 768px) {
  .load-more-btn {
    padding: 14px 28px;
    font-size: 14px;
    min-width: 180px;
  }
  
  .scroll-hint p {
    font-size: 12px;
  }
}
</style>