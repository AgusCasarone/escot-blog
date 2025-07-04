# Escot-Blog

API RESTful creada con NestJS para gestionar artículos de blog. Incluye CRUD completo, autenticación JWT, subida de imágenes a AWS S3, filtros avanzados, documentación Swagger y despliegue automatizado en Azure App Service.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Desarrollo

Link al repositorio de GitHub: <https://github.com/AgusCasarone/escot-blog>

Escot Blog es una API RESTful creada con NestJS para gestionar artículos de blog. Incluye CRUD completo, autenticación JWT, subida de imágenes a AWS S3, almacenamiento de datos en MongoDB, filtros avanzados, documentación Swagger y despliegue automatizado en Azure App Service.

El desarrollo de este proyecto inició el 28/01/2025 a las 18hs.

## Despliegue

1. Clonar el repositorio
2. Correr `npm intall`
3. Instalar todas las librerías corriendo los siguientes scripts:
    1. `npm install @nestjs/mongoose mongoose` para la base de datos MongoDb
    2. `npm install @nestjs/config` para la configuración
    3. `npm install @nestjs/swagger` para la documentación con Swagger
    4. `npm install @nestjs/jwt` para la autenticación con JWT
    5. `npm install --save @nestjs/passport passport passport-local` para las credenciales
    6. `npm install --save-dev @types/passport-local` para la información necesaria de autenticación
    7. `npm i bcryptjs --save` para la encriptación de la contraseña
    8. `npm i passport-jwt --save` para el inicio de sesión
    9. `npm install @aws-sdk/client-s3` para tener la conexión con AWS
    10. `npm i -D @types/multer` para manejar las peticiones al servidor AWS
4. La documentación completa de cada endpoint se encontrará con Swagger accediendo a `localhost:3000/api`
5. Se debe crear una base de datos MongoDB cuyo string de conexión sea `mongodb://localhost:27017/escot-blog`

## Notas

Durante el desarrollo tuve un bloqueo de aproximadamente 3 o 4 horas debido a la falta de una cuenta en AWS para poder crear el bucket s3. Lo solucioné cuando una amiga mía me prestó su cuenta.

Por el mismo motivo, tuve un bloqueo de una hora en el que estuve buscando alguna manera de poder subir la build a Azure, ya que no tengo cuenta y la activación de una cuenta nueva no está funcionando correctamente (la rechaza por cuestiones de validación de identidad con la tarjeta de crédito). Mientras espero que la gente a la que le pregunté si puede prestarme una cuenta, hice una build a [Netlify](https://escot-blog.netlify.app/articles/)  y otra de respaldo a [Railway](https://escot-blog-production.up.railway.app/) que son servicios similares, con pipelines de CI/CD automáticos, pero con un servicio gratuito. La desventaja de estos, es que los deploys son muy inestables y suelen caerse. Al testearlo, por favor avisarme para que pueda validar que esté corriendo adecuadamente.

En este sitio de [Notion](https://agus-casarone.notion.site/Desaf-o-Escot-Blog-189aabca27a8807fbefcfc0e7cdf3144) detallé el proceso de desarrollo paso a paso y la planificación previa, con un estimado de tiempo previo que se puede contrastar con una tabla donde está volcado el tiempo de trabajo real que invertí en cada bloque.

## Fuentes de información oficial

[Conección con la base de datos](https://docs.nestjs.com/techniques/mongodb)

[Documentación con Swagger](https://docs.nestjs.com/openapi/introduction)

[Autenticación con JWT](https://docs.nestjs.com/security/authentication)

[Conexión con AWS](https://docs.nestjs.com/faq/serverless)
