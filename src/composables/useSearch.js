//"ref" es para crear variables reactivas para la consulta y busqueda
// computed crea lista de imagenes filtradas que se actualiza automaticamente
import { ref, computed } from 'vue';
// exporta y define la funcion useSearch, esta funcion recibe un argumento: un array reactivo de images, haciendo que el composable sea flexible, funcionando con cualquier lista de imagenes que le pases 
export function useSearch(images) {
    const searchQuery = ref('')//crea la referencia reactiva, inicializando vacoi para cuando el usuario escriba en un campo de busqueda
    const selectedTags = ([])
    // la propiedad "computed" es una variable que depende de otros estados reactivos, su valor se recalcula automaticamente solo cuando las dependecias cambian
    const filteredImages = computed(() => {// se encargade aplicar los filtros y devolver la lusta resultante, se re-evalua autmaticamente
        let filtered = images.value//crea una copia de la lista de imagenes original para no modificarla directamente

        if (searchQuery.value) {//Filtro por texto si searchquery no est avacio filtrar
            const query = searchQuery.value.toLowerCase()//almacena la consulta de busqueda en minuscula para realizar una busqueda que no distinga entre mayuscula y minuscula
            filtered = filtered.filter(image =>//utiliza la copia creada
                //utiliza el metodo "filter()" para crear un nuevo array con las imagenes que cumplen los criterios de busqueda, lo que ayuda a que esta lline se ejecutara cada vez que [searchQuery.value] o [image.value] cambien, sin que se tenga que llamar manualmente
                image.title.toLowerCase().includes(query) ||//Revisa si el titulo de la imagen incluye la consulta de busqueda
                image.description.toLowerCase().includes(query) ||// revisa si la descripcion de la imagen incluye la consulta de busqueda
                image.tags.some(tag => tag.toLowerCase().includes(query))// revisa si alguno de los tags de la imagen incluye la consulta de busqueda
            )

        }
        if (selectedTags.value.lenght > 0) {//filtro por tags, filtra la lista resultante del paso anterior
            filtered = filtered.filter(image =>
                selectedTags.value.every(tag => image.tags.includes(tag))//verifica si todos(every) los tags del array estan presentes en los tags de esa image, asegurando que la imagen cumpla con los tgas seleccionados
            )
        }
        return filtered//devuelve la lista final de imagenes ya filtrada
    })

    const allTags = computed(() => {//se encarga de extraer y devolver una lista unica de todos los tags disponibles
        const tags = new Set()//usa set para almacenar los tags, en set solo se contienen valores unicos
        images.value.forEach(image => {//itera sobre cada imagen
            image.tags.forEach(tag => tags.add(tag))//itera sobre sus tags y añade al set para cada imagen
        })
        return Array.from(tags).sort()//convierte el set de tags en un array, en orden alfabetico y lo devuelve
    })

    const performSearch = (query) => {//esta funcion se usa para acutualizar el estado de searchQuery, util para que la busqeuda se dispare desde diferentes eventos, como un clic de un boton o un "enter" en un campo de texto
        searchQuery.value = query
    }

    const toggleTag = (tag) => {//esta permite añadir o quitar un tag del array
        const index = selectedTags.value.indexOf(tag)//busaca si el tag ya existe dentro
        if (index === -1) {//valida si el tag no esta, lo añade con push
            selectedTags.value.push(tag)
        } else {
            selectedTags.value.splice(index, 1)// si ya esta lo elimina con splice
        }// permite que un mismo boton funcione para activar y desactivar un filtro de tag
    }

    const clearFilters = () => {// funcion que reinicia el estado de los filtros,vaciando el texto de busqueda y array de tags
        searchQuery.value = ''
        selectedTags.value = []
    }
    // devuelve el objeto de estas tres propiedades reactivas y una funcion
    return {
        searchQuery,
        selectedTags,
        filteredImages,
        performSearch,
        allTags,
        toggleTag,
        clearFilters
    }
}
