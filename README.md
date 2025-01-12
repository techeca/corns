
# Bob's corn - API
API de ejercicio con rate limiter separando Front y API en dos proyectos diferentes.  
`API` con la creación de usuario y compras.  
`Front` para interfaz de compra -> [Ir](https://github.com/techeca/corns/tree/master/Front)  

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

## Controllers
Los controllers de la Api son los siguientes:

`Purchase`: Contiene `create` y `read`/`list`.  
`User`: Contiene `create` y `read`.  

## Middlewares
Principalmente contiene el middleware encargado de realizar rate limiter al endpoint `/purchase/create`.  

`rateLimiter.ts`

## Endpoints
Los endpoint funcionando son los siguientes:

[POST]  `URL.../purchase/create`  
Example `Status 200`:
```json
{
    "result": {
        "id": 30,
        "userId": 1,
        "timeStamp": "2025-01-12T03:37:58.889Z"
    }
}
```

[GET]   `URL.../purchase/list`  
Example `Status 200`:
```json
{
    "result": [
        {
            "id": 1,
            "userId": 1,
            "timeStamp": "2025-01-11T22:04:58.002Z"
        },
        {
            "id": 2,
            "userId": 1,
            "timeStamp": "2025-01-11T22:19:57.276Z"
        }
    ]
}
```

[POST]  `URL.../user/create`  
Example `Status 200`:  
```json
{
    "result": {
        "id": 1,
        "ip": "::1",
        "corns": 0
    }
}
```

[GET]   `URL.../user/read`  
Example `Status 200`:  
```json
{
    "result": {
        "id": 1,
        "ip": "::1",
        "corns": 0,
        "purchases": [
            {
                "id": 1,
                "userId": 1,
                "timeStamp": "2025-01-11T22:04:58.002Z"
            },
            {
                "id": 2,
                "userId": 1,
                "timeStamp": "2025-01-11T22:19:57.276Z"
            }
        ]
    }
}
```
