<template>
  <nav class="navigation-bar">
    <div class="nav-brand">
      <h1>Vizo Gallery</h1>
    </div>
    
    <div class="search-container">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchText"
          type="text"
          placeholder="Buscar imágenes..."
          class="search-input"
          @input="handleSearch"
          @focus="showSuggestions = true"
          @blur="hideSuggestions"
        />
        <button v-if="searchText" class="clear-btn" @click="clearSearch">
          ✕
        </button>
      </div>

      <!-- Sugerencias de búsqueda -->
      <div v-if="showSuggestions && searchText" class="suggestions-dropdown">
        <div
          v-for="(suggestion, index) in filteredSuggestions"
          :key="index"
          class="suggestion-item"
          @mousedown="selectSuggestion(suggestion)"
        >
          🔍 {{ suggestion }}
        </div>
      </div>
    </div>

    <div class="nav-actions">
      <button class="nav-btn" @click="$emit('show-favorites')">
        ❤️ Favoritos
      </button>
      <button class="nav-btn" @click="$emit('show-upload')">
        📤 Subir
      </button>
      <div class="user-menu">
        <button class="user-btn">
          👤
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    suggestions: {
      type: Array,
      default: () => ['naturaleza', 'ciudad', 'playa', 'montañas', 'comida', 'arte']
    }
  },
  data() {
    return {
      searchText: this.modelValue,
      showSuggestions: false,
      popularSearches: ['atardecer', 'playa', 'montañas', 'ciudad', 'comida', 'arte']
    }
  },
  computed: {
    filteredSuggestions() {
      if (!this.searchText) return this.popularSearches;
      return this.suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(this.searchText.toLowerCase())
      ).slice(0, 5);
    }
  },
  watch: {
    modelValue(newVal) {
      this.searchText = newVal;
    }
  },
  methods: {
    handleSearch() {
      this.$emit('update:modelValue', this.searchText);
      this.$emit('search', this.searchText);
    },
    clearSearch() {
      this.searchText = '';
      this.handleSearch();
      this.showSuggestions = false;
    },
    selectSuggestion(suggestion) {
      this.searchText = suggestion;
      this.handleSearch();
      this.showSuggestions = false;
    },
    hideSuggestions() {
      setTimeout(() => {
        this.showSuggestions = false;
      }, 200);
    }
  }
}
</script>

<style scoped>
.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-brand h1 {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.search-container {
  position: relative;
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 15px;
  color: #666;
  z-index: 2;
}

.search-input {
  width: 100%;
  padding: 12px 45px 12px 45px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  font-size: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  outline: none;
}

.search-input:focus {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.clear-btn {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-btn:hover {
  color: #ff4757;
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 15px;
  margin-top: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
}

.suggestion-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
}

.suggestion-item:hover {
  background-color: #f8f9fa;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.user-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
  .navigation-bar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .search-container {
    margin: 0;
    width: 100%;
    max-width: none;
  }

  .nav-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>