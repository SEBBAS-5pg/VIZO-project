// ref (referencia reactiva)=  cuando un valor de una variable "ref" cambia, Vue sabe que actualiza la parte de usuario que la este usando, la abse para el estado
import { sampleImages } from '@/data/sampleImages'
import { ref } from 'vue'

export function useImages() {
    // se crea la constante images
    const images = ref(sampleImages)
    //aqui inicializa un array de imagenes como una "referencai reactiva", envuelve el array permitiendo que vue siga sus cambios si en el futuro se agrega o elimina elementos del array, actualizandose automaticamente

    const isLoading = ref(false)// se crea una referencia reactiva booleana, sirviendo para crear o mostrar un "spinner" mientras se esperan nuevos datos

    const loadMoreImages = () => {
        // contiene la logica para cargar mas imagenes
        isLoading.value = true// cambia la fincion de arriba "isLoading" a true para que comience el proceso de carga

        return new Promise((resolve) => {
            setTimeout(() => {
                //simula una llamada a una api real, haciendo por ejemplo una solicitud fetch o axios para obtener datos setTimeout
                const newImages = [// se crea un array con tres nuevas imagees
                    {
                        id: images.value.length + 1,
                        title: 'Nuevo paisaje',
                        description: 'Imagen adicional cargada dinámicamente',
                        url: `https://source.unsplash.com/random/300x400?${400 + Math.floor(Math.random() * 100)}?random=${Date.now()}`,
                        tags: ['nuevo', 'naturaleza', 'paisaje']
                    },
                    {
                        id: images.value.length + 2,
                        title: 'Arquitectura moderna',
                        description: 'Diseño contemporáneo',
                        url: `https://source.unsplash.com/random/300x400?${380 + Math.floor(Math.random() * 100)}?random=${Date.now() + 1}`,
                        tags: ['arquitectura', 'moderno', 'diseño']
                    },
                    {
                        id: images.value.length + 3,
                        title: 'Retrato artístico',
                        description: 'Expresión creativa',
                        url: `https://source.unsplash.com/random/300x400?${420 + Math.floor(Math.random() * 100)}?random=${Date.now() + 2}`,
                        tags: ['arte', 'retrato', 'creativo']
                    }
                ]
                images.value = [...images.value, ...newImages]//se accede al valor interno de ref usando .value
                // [...] este operador de propagacion se usa para crear un nuevo array, ya que las referencias reactivas funcioann mejor cuando se remplaza el valor en lugar de mutar el array original. Creando un nuevo array que contiene todas las imagenes que ya tenias(..image.value) mas las nuevas (...newImages)
                isLoading.value = false// cuando la "carga" ya termina y el array se actualiza, se cambia el "isLoading" de nuevo a false
                resolve(newImages)
            }, 1500)
        })
    }
    const addImage = (newImage) => {//permite añadir una sola imagen al final de la lista
        images.value = [...images.value, {...newImage, id: Date.now()}]
    }
    const removeImage = (imageId) => {//permite eliminar una imagen de la lista usando su ID
        images.value = images.value.filter(img => img.id !== imageId)
    }
    //finalmente el composable devuelve un objeto que contiene todas las referencuas y funcones que el componente necesita
    // siempre que un componente imprte y use "useImages()" recibira este objeto
    return {
        images,
        isLoading,
        loadMoreImages,
        addImage,
        removeImage
    }
}