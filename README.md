
# Pokedex App

Esta es una aplicación de Pokedex creada en React que utiliza la [PokeAPI](https://pokeapi.co/) para obtener información sobre todos los Pokémon. La aplicación incluye búsqueda de Pokémon por nombre, carga dinámica de datos y una interfaz amigable para explorar.

## Características

- Mostrar una lista de Pokémon con paginación.
- Buscar Pokémon por nombre utilizando un cuadro de búsqueda.
- Visualizar información detallada de cada Pokémon.
- Diseño responsivo y moderno.

## Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <URL-del-repositorio>
   cd <nombre-del-repositorio>
   ```

2. **Instalar dependencias**

   Asegúrate de tener Node.js y npm instalados. Luego, instala las dependencias del proyecto:

   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**

   Inicia el servidor de desarrollo:

   ```bash
   npm start
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del Proyecto

El proyecto sigue una estructura organizada para mantener el código limpio y modular:

```
src/
├── components/        # Componentes reutilizables (CardPokemon, Loader, etc.)
├── context/           # Context API para manejar el estado global
├── hooks/             # Custom hooks (como useForm)
├── pages/             # Vistas principales (HomePage, SearchPage, etc.)
├── styles/            # Archivos CSS
├── App.jsx            # Componente raíz de la aplicación
└── index.js           # Punto de entrada de React
```

## Dependencias

- React
- React Router DOM
- Context API
- [PokeAPI](https://pokeapi.co/)

## Uso

1. En la página principal, se cargan Pokémon con paginación.
2. Utiliza el cuadro de búsqueda para buscar un Pokémon específico por su nombre.
3. Haz clic en un Pokémon para ver más detalles sobre él.


