/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

import Database from '@ioc:Adonis/Lucid/Database'

Route.group(() => {
  Route.post('users/register', 'AuthController.store').as('register');
  Route.post('users/login', 'AuthController.login').as('login');
  Route.post('users/logout', 'AuthController.logout').as('logout');
  Route.get('users/:id', 'AuthController.show').as('profile');
}).prefix('api/');

/*
rutas que crea resource con apiOnly:
  GET /projects/ -> index
  POST /projects/ -> store            C
  GET /projects/:id -> show           R
  PUT, PATCH /projects/:id -> update  U
  DELETE /projects/:id -> destroy     D
*/
Route
  .resource('projects', 'ProjectsController')
  .apiOnly() 
