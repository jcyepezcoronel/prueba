# Zoho CRM Integration Proxy

Este proyecto es una integración básica usando **Angular** en el frontend y un **proxy Node.js (Express)** para comunicarse con la API de Zoho CRM. El proxy se encarga de gestionar las peticiones y tokens hacia Zoho, y de proteger las credenciales del lado cliente.

---

## Contenido

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Estructura](#estructura)
- [Configuración del proxy](#configuración-del-proxy)
- [Uso](#uso)
- [Notas adicionales](#notas-adicionales)
- [Solución de problemas](#solución-de-problemas)

---

## Requisitos

- **Node.js** (v14 o superior)
- **npm** (v6 o superior)
- (Opcional) **Angular CLI** para servir el frontend  
- Acceso a las **credenciales Zoho** (OAuth token válido)

---

## Instalación

1. **Clona el repositorio o descarga los archivos**
   ```sh
   git clone <URL-del-repo>
   cd <carpeta-del-proyecto>
   ```

2. **Instala dependencias para el proxy**
   ```sh
   cd proxy
   npm install
   ```
   (Esto instalará express, body-parser y axios)

3. **(Opcional) Instala dependencias para el frontend**
   ```sh
   cd ../frontend
   npm install
   ```

---

## Estructura

```
/proxy               # Proxy Node.js/Express para conectar con Zoho CRM
    proxy.js
    package.json

/frontend            # Código del frontend Angular (opcional)
    src/
    angular.json
    ...
```

---

## Configuración del proxy

1. **Ubicación**
   Dentro de la carpeta `/proxy` está el archivo `proxy.js`.

2. **Token de Zoho**
   El frontend debe enviar el header:  
   ```
   Authorization: Zoho-oauthtoken <tu_oauth_token>
   ```
   El proxy recibe y reenvía ese token a Zoho.

---

## Uso

### 1. **Prender el Proxy**

En la carpeta `/proxy`, corre:

```sh
node proxy.js
```

Esto inicia el servidor en [http://localhost:3000](http://localhost:3000).

### 2. **Prender el Frontend** (opcional)

En la carpeta `/frontend`, puedes correr:

```sh
ng serve --open
```

Esto abrirá la aplicación Angular en [http://localhost:4200](http://localhost:4200).

---

## ¿Cómo funciona el flujo?

1. El **frontend** hace un POST a:
   ```
   http://localhost:3000/api/zoho/contacts
   ```
   Con datos, por ejemplo:
   ```json
   {
     "data": [
       {
         "Last_Name": "Apellido",
         "Email": "nuevo_correo@correo.com",
         "Phone": "1234567890",
         "Account_Name": "Mi Empresa"
       }
     ]
   }
   ```
   Y el header:
   ```
   Authorization: Zoho-oauthtoken <token>
   ```

2. **El proxy** recibe la petición y la reenvía usando Axios a Zoho CRM, devolviendo la respuesta o el error real de Zoho.

---

## Solución de problemas

- **Error 400 `DUPLICATE_DATA`:**  
  El correo/teléfono ya existe en Zoho. Usa datos únicos o implementa upsert.

- **Error 401 `INVALID_TOKEN`:**  
  El token Zoho es inválido o ha expirado. Renueva el token OAuth.

- **Error 500:**  
  Problema inesperado en el proxy; revisa la consola del proxy para detalles del error de Zoho.

- **CORS:**  
  El proxy ya permite todos los orígenes por default.

---

## Notas adicionales

- El proxy transfiere los headers y el body tal cual al API de Zoho.
- Puedes modificar o extender el proxy (`proxy.js`) para soportar otros endpoints de Zoho CRM.
- Asegúrate de manejar y proteger el OAuth token de Zoho.

---

### ¿Preguntas o problemas?

Abre un issue o contacta al responsable del proyecto.
