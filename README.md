# rest-api-biodat
## Getting started

clona el repo usando los comando de abajo:

```bash
# usando SSH
git clone git@github.com:mezielabs/taskist.git
# usando HTTPS
git clone https://github.com/mezielabs/taskist.git
```

despues de clonar, correr:

```bash
npm install
```

duplicar `.env.example`:

```bash
cp env.example .env
```

construir la aplicacion:

```bash
node ace build
```

Generar `APP_KEY`:

```bash
node ace generate:key
```

> Va a generar un string random, que tenes que copiar en `.env`.

Actualizar variables de entorno del proyecto:

```txt
// .env

APP_KEY=YOUR_GENERATED_KEY_COPIED_FROM_ABOVE
DB_CONNECTION=mysql
DB_HOST=localhost
DB_NAME=taskist
DB_USER=YOUR_DATABASE_USERNAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

> Recorda actualizar `YOUR_DATABASE_USERNAME` y `YOUR_DATABASE_PASSWORD` con tus detalles de base de datos.

Rebuild a la aplicacion:

```bash
node ace build
```

Correr las migraciones:

```bash
node ace migration:run
```

Finalmente, correr el servidor:

```bash
node ace serve
```

and visit [http://0.0.0.0:3333](http://0.0.0.0:3333) to see the application in action.
