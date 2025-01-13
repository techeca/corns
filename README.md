
# Bob's corn
Ejercicio de rate limiter separando Front y API en dos proyectos diferentes.  
`API` con la creación de usuario y compras.  
`Front` para interfaz de compra.

# Instalación

Clonar repositorio
```bash
git clone https://github.com/techeca/corns
```

Abrir terminal en la raíz del repositorio clonado

Mover a carpeta `API` e instalar dependencias
```bash
cd API
npm i
```

Mover a carpeta `Front` e instalar dependencias
```bash
cd Front
npm i
```

## Configuración postgres en API
Para establecer la conexión con la bd postgres debe seguir los siguientes pasos:

Crear archivo .env en la carpeta `API`
```bash
PORT=3000
FRONT_URL=http://localhost:5173
MODE=dev
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DBNAME?schema=public"
```

`PORT`: Especificar para iniciar API.  
`FRONT_URL`: URL de Front (Ojo que puede cambiar puerto).  
`DATABASE_URL`: Cambiar `USER`, `PASSWORD` y `DBNAME` por tus credenciales y nombre de base de datos, tambien puede cambiar `5432` si tiene postgres configurado en otro puerto.

Primera migración para sincronizar schema cob base de datos
```bash
npx prisma migrate dev
```
> Prisma solicita un nombre para la una nueva migración.

Ahora puede iniciar la API
```bash
npm run dev
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
