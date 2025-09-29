<template>
  <ion-app>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title class="app-title">VIZZO</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="notificationsOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="main-content">
      <!-- Selector de Formato -->
      <div class="format-section">
        <ion-segment v-model="selectedFormat" class="format-selector">
          <ion-segment-button value="square">
            <ion-label>Cuadrado</ion-label>
          </ion-segment-button>
          <ion-segment-button value="panoramic">
            <ion-label>Panorámico</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>

      <!-- Vista Previa de Cámara -->
      <div class="camera-section">
        <div class="camera-preview" :class="selectedFormat">
          <div class="preview-content">
            <ion-icon :icon="cameraOutline" class="camera-icon" />
            <p>Vista previa de cámara</p>
            <div class="format-badge">
              {{ selectedFormat === 'square' ? '1080×1080' : '5120×1080' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Botón de Captura -->
      <div class="capture-section">
        <ion-button class="capture-btn" shape="round">
          <ion-icon :icon="apertureOutline" />
        </ion-button>
      </div>

      <!-- Galería -->
      <div class="gallery-section">
        <div class="section-header">
          <h3>Imágenes Recientes</h3>
          <ion-button fill="clear" size="small">
            Ver todo
          </ion-button>
        </div>

        <div class="gallery-grid">
          <div 
            v-for="n in 4" 
            :key="n" 
            class="gallery-item"
            :class="selectedFormat"
          >
            <img :src="getSampleImage(n)" alt="Sample image" />
            <div class="item-overlay">
              <ion-icon :icon="heartOutline" />
            </div>
          </div>
        </div>
      </div>
    </ion-content>

    <!-- Tabs Inferiores -->
    <ion-footer>
      <ion-toolbar>
        <div class="tabs-container">
          <ion-button 
            v-for="tab in tabs" 
            :key="tab.id"
            :class="{ 'tab-active': activeTab === tab.id }"
            fill="clear" 
            class="tab-btn"
            @click="activeTab = tab.id"
          >
            <ion-icon :icon="tab.icon" />
            <span>{{ tab.label }}</span>
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonApp, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonIcon,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonFooter
} from '@ionic/vue';
import { 
  notificationsOutline, 
  cameraOutline, 
  apertureOutline, 
  heartOutline,
  videocamOutline,
  personOutline,
  home,
  imagesOutline
} from 'ionicons/icons';

// Estados
const selectedFormat = ref<'square' | 'panoramic'>('square');
const activeTab = ref('home');

// Tabs
const tabs = [
  { id: 'home', label: 'Inicio', icon: home },
  { id: 'videos', label: 'Videos', icon: videocamOutline },
  { id: 'gallery', label: 'Galería', icon: imagesOutline },
  { id: 'profile', label: 'Perfil', icon: personOutline }
];

// Imágenes de ejemplo
const getSampleImage = (index: number) => {
  const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&w=800&h=200&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&w=400&h=400&fit=crop'
  ];
  return images[index - 1];
};
</script>

<style>
/* Variables de colores VIZZO */
:root {
  --vizzo-black: #000000;
  --vizzo-dark-blue: #14213d;
  --vizzo-orange: #fca311;
  --vizzo-light-gray: #e5e5e5;
  --vizzo-white: #ffffff;
}

/* Header */
.app-title {
  font-weight: 700;
  font-size: 1.4em;
  color: var(--vizzo-orange);
  text-align: center;
}

ion-toolbar {
  --background: var(--vizzo-dark-blue);
  --color: var(--vizzo-white);
}

/* Content */
.main-content {
  --background: var(--vizzo-black);
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 16px;
}

/* Selector de formato */
.format-section {
  margin-bottom: 24px;
}

.format-selector {
  --background: var(--vizzo-dark-blue);
  --color: var(--vizzo-light-gray);
  --color-checked: var(--vizzo-orange);
  border-radius: 12px;
}

/* Vista previa de cámara */
.camera-section {
  margin-bottom: 32px;
}

.camera-preview {
  background: var(--vizzo-dark-blue);
  border-radius: 16px;
  border: 2px solid #2c3750;
  position: relative;
  overflow: hidden;
}

.camera-preview.square {
  aspect-ratio: 1;
}

.camera-preview.panoramic {
  aspect-ratio: 5120 / 1080;
}

.preview-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--vizzo-light-gray);
  text-align: center;
  padding: 20px;
}

.camera-icon {
  font-size: 64px;
  color: var(--vizzo-orange);
  margin-bottom: 16px;
  opacity: 0.8;
}

.format-badge {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: var(--vizzo-orange);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

/* Botón de captura */
.capture-section {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.capture-btn {
  --background: var(--vizzo-orange);
  --background-activated: #de8f0f;
  --color: var(--vizzo-black);
  width: 70px;
  height: 70px;
  --border-radius: 50%;
}

.capture-btn ion-icon {
  font-size: 28px;
}

/* Galería */
.gallery-section {
  margin-bottom: 80px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h3 {
  color: var(--vizzo-white);
  font-size: 1.2em;
  font-weight: 600;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: var(--vizzo-dark-blue);
}

.gallery-item.square {
  aspect-ratio: 1;
}

.gallery-item.panoramic {
  aspect-ratio: 5120 / 1080;
  grid-column: span 2;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .item-overlay {
  opacity: 1;
}

.item-overlay ion-icon {
  color: var(--vizzo-white);
  font-size: 20px;
}

/* Tabs inferiores */
ion-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

ion-footer ion-toolbar {
  --background: var(--vizzo-dark-blue);
  padding: 8px 0;
}

.tabs-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.tab-btn {
  --color: var(--vizzo-light-gray);
  --color-activated: var(--vizzo-orange);
  --background-activated: transparent;
  flex-direction: column;
  min-width: 60px;
  height: 60px;
}

.tab-btn ion-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.tab-btn span {
  font-size: 12px;
}

.tab-active {
  --color: var(--vizzo-orange) !important;
}

.tab-active ion-icon {
  color: var(--vizzo-orange);
}
</style>