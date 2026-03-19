
# 🍿 Aplicación Películas – React 19
Aplicación web desarrollada con React 19 que simula una plataforma de compra de películas. Permite a los usuarios explorar un catálogo, agregar productos a un carrito y gestionar pedidos.

Dependiendo del rol del usuario, es posible:

- Visualizar sus propios pedidos
- Consultar todos los pedidos registrados en el sistema (rol administrador)

## 🛠️ Tecnologías utilizadas
| Tecnología           | Uso                                                   |
| -------------------- | ----------------------------------------------------- |
| **React 19**         | Librería principal para la construcción de interfaces |
| **React Router DOM** | Manejo de rutas y navegación entre vistas             |
| **Zustand**          | Manejo de estado global de forma simple y escalable   |
| **Axios**            | Cliente HTTP para la comunicación con el backend      |
| **TailwindCSS**      | Estilización rápida y responsive                      |
| **Lucide React**     | Librería de íconos modernos y personalizables         |
| **SweetAlert2**      | Alertas y notificaciones interactivas                 |


## 🏗️ Arquitectura del proyecto:
El proyecto sigue una arquitectura modular y organizada en capas, diseñada para mantener el código escalable, reutilizable y fácil de mantener. La estructura principal se divide en diferentes carpetas, cada una con una responsabilidad claramente definida:

- **pages** para las vistas principales de la aplicación. Cada página representa una pantalla completa (por ejemplo: catálogo, carrito, pedidos).

- Los **components** componentes reutilizables como el layout, card y ventanas de dialogo.

- **router** para la configuración de rutas de la aplicación utilizando React Router.

- **store** para manejar el estado global de la aplicación mediante Zustand.


## Diseño Responsive: 
El diseño se validó para funcionar correctamente tanto en dispositivos móviles como en escritorio, usando las utilidades de TailwindCSS.

## Desplegar aplicacion
Instalar dependencias de la aplicacion:

```bash
npm install
```

Para iniciar un servidor de desarrollo local, ejecute:

```bash
npm run dev
```

## Aplicacion disponible

- Aplicacion esta disponible en [Aplicacion Peliculas](https://appmarxfrontend.vercel.app/)
Usuario: marx@gmail.com
Clave de acceso: marx123