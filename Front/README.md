# Bob's corn - Front
Frontend de ejercicio con rate limiter separando Front y API en dos proyectos diferentes.  
`API` con la creación de usuario y compras -> [Ir](https://github.com/techeca/corns/tree/master/API)  
`Front` para interfaz de compra.

# Instalación

Clonar repositorio
```bash
git clone https://github.com/techeca/corns
```

Abrir terminal en la raíz del repositorio clonado

Mover a carpeta `Front` e instalar dependencias
```bash
cd Front
npm i
```

## Configuración de API en Front
Para establecer las solicitudes desde el `Front` a la `API` siga los siguientes pasos:

Crear archivo `.env` en la carpeta Front
```bash
VITE_URL_API=http://localhost:3000
```

Ahora puede iniciar el Front
```bash
npm run dev
```

## Componentes
Son 3 componenetes principales los que conforman la aplicación y en `ui` puedes encontrar los componentes de `shadcn`.

`BuyCornCard`: Contiene button que envía la solicitud de compra de un `corn`.  
`CountDown`: Componente para ver la cuenta regresiva.  
`StatsCard`: Componente con total de `corn` comprados por el usuario.

## Hooks, Context & Providers
Los que pertenecen a la aplicación son `useUserData` y `useTimerControl`.  

### Hooks
`useUserData`: Retorna `updateCorns` para incrementar la cantidad de corns +1, `corns` para saber total y `isLoading` para saber que terminó de realizar cada fetch.  
`useTimerControl`: Hook para context `TimerContext`.

### Context & Providers
`TimerContext`: Retorna `time` que representa el tiempo restante para una proxima compra, `state` para saber si está o no corriendo, `start` para iniciar la cuenta regresiva, `stop` para detener la cuenta regresiva.

## Requests
En `./Front/src/lib/requests.ts` puede encontrar las solicitudes fetch realizadas a la `API`.

`getUserData`: Obtiene la informacion del usuario y sus purchases.  
`registerNewUser`: Registra al usuario si es que no existe.  
`buyCorn`: Solicitar la compra de un `corn`