<template>
    <Header class="app-header">
        <div class="header-content">
            <div class="logo">
                <h1>🎨 V I Z O</h1>
                <p>La GALERIA</p>
            </div>
            `search bar es la etiqueta
            v-model="searchquery": es la directriz de vue creando un enlace bidireccional entre la propiedad searchQuery
            y AppHeader y el campo de entrada del componente SearchBar
            1.pasa el valor de searchQuery al componente searchBar y actualiza
            2.escucha el evento input o update del SearchBar con el nuevo valor de texto`
            `@search="performSearch":Dice al componente AppHeader que cuando el componente hijo SearchBar emita un event
            llamado search, ejecute la funcion performSearch que se le ha pasado como una prop`
            <div class="search-section">
                <SearchBar v-model="searchQuery" @search="performSearch" />
            </div>
            `contiene los botones de accion
            upload que emite un evento llamado show-upload y show-favorites`
            <div class="header-actions">
                <button class="action-btn" @click="$emit('show-upload')">
                    <font-awesome-icon :icon="['fas', 'upload']"/> Subir
                </button>
                <button class="action-btn" @click="$emit('show-favorites')">
                    <font-awesome-icon :icon="['fas', 'heart']"/> Favoritos
                </button>
            </div>
        </div>
    </Header>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import SearchBar from '../ui/SearchBar.vue';
import { faHeart, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUpload, faHeart)

export default {// permite exportar la definicion de un componente, 
    name: 'AppHeader',// nombre del componente
    components: {//lo que tiene el componente
        SearchBar,
        FontAwesomeIcon
    },
    Props: {//"los props" o propiedades son la forma de comunicar los componentes entre padre a hijo
        searchQuery: String,// dice que espera recibir una prop llamado searchQuery
        performSearch: Function,// tambien espera un prop llamado performSearch que debe ser una function
        default: ''
    },
    emits: ['search', 'show-upload', 'show-favorites'],// es una buena practica para Vue 3, declara explicitamente los eventos que el componente puede emitir
    methods: {//define las funciones que el componente puede ejecutar
        handleSearch(query) {// es el metodo que se ejecuta cuando el SearchBar emite su evento @search, lo que hace es reemitir ese evento al componente padre. DIce que emita el evento searcg y pase el valor de la busqeda con el (query)
            this.$emit('search', query)
        }
    }
}
</script>

<style scoped>
.app-header {
    background-color: #14213D;
    padding: 1.5rem 0;
    margin-bottom: 2rem;
    color: #E5E5E5;
}

.header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 2rem;
    align-items: center;
}

.logo h1 {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
    color: #FCA311;
}

.logo p {
    font-size: 0.9rem;
    opacity: 0.9;
    margin: 0;
}

.search-section {
    max-width: 500px;
    justify-self: center;
    /* Centra el SearchBar en la columna del medio */
}

.header-actions {
    display: flex;
    gap: 1rem;
}

.action-btn {
    background-color: rgba(252, 163, 17, 0.2);
    border: 1px solid rgba(252, 163, 17, 0.5);
    color: #E5E5E5;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
}

.action-btn:hover {
    background-color: #FCA311;
    color: #14213D;
    transform: translateY(-2px);
}

.action-btn .svg-inline--fa {
    margin-right: 0.5rem;
}

@media (max-width: 968px) {
    .header-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 1rem;
    }

    .logo h1 {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .header-actions {
        flex-direction: column;
        gap: 0.5rem;
    }

    .action-btn {
        width: 100%;
    }
}
</style>