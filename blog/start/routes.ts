import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('users/register', 'AuthController.store').as('register');
  Route.post('users/login', 'AuthController.login').as('login');
  Route.post('users/logout', 'AuthController.logout').as('logout');
  Route.get('users/:id', 'AuthController.show').as('profile').middleware('auth');
}).prefix('api/');

Route.group(() => {
  Route.get('projects/', 'ProjectsController.index').middleware(['auth']);
  Route.post('projects/', 'ProjectsController.store').middleware(['auth']);
  Route.get('projects/:project_id', 'ProjectsController.show').middleware(['auth', 'ProjectAuth:lider,colaborador']);
  Route.put('projects/:project_id', 'ProjectsController.update').middleware(['auth', 'ProjectAuth:lider,colaborador']);
  Route.delete('projects/:project_id', 'ProjectsController.destroy').middleware(['auth', 'ProjectAuth:lider,colaborador']);
}).prefix('api/');

Route.group(() => {
  Route.get(':project_id/items', 'ItemsController.index');
  Route.post(':project_id/items', 'ItemsController.store');
  Route.get(':project_id/items/:item_id', 'ItemsController.show');
  Route.put(':project_id/items/:item_id', 'ItemsController.update');
  Route.delete(':project_id/items/:item_id', 'ItemsController.destroy');
}).prefix('api/projects/')
  .middleware(['auth', 'ProjectAuth:lider,colaborador'])

Route.group(() => {
  Route.get(':project_id/items/:item_id/measurements', 'measurementsController.index');
  Route.post(':project_id/items/:item_id/measurements', 'measurementsController.store');
  Route.get(':project_id/items/:item_id/measurements/:measurement_ids', 'measurementsController.show');
  Route.get(':project_id/items/:item_id/measurements/:measurement_ids/modulus', 'measurementsController.showModulus');
  Route.get(':project_id/items/:item_id/measurements/:measurement_ids/phase', 'measurementsController.showPhase');
  //Route.put(   ':project_id/items/:item_id/measurements/:measurement_id', 'measurementsController.update');
  Route.delete(':project_id/items/:item_id/measurements/:measurement_ids', 'measurementsController.destroy');
}).prefix('api/projects/')
  .middleware(['auth', 'ProjectAuth:lider,colaborador'])

Route.group(() => {
  Route.get('measurers/', 'measurersController.index');
  Route.post('measurers/', 'measurersController.store');
  // Route.get(   ':project_id/items/:item_id/measurements/:measurement_id', 'measurementsController.show');
  Route.put('measurers/:measurer_id/', 'measurersController.update');
  Route.delete('measurers/:measurer_id/', 'measurersController.destroy');
}).prefix('api/')
  .middleware(['auth'])

/*
rutas que crea resource con apiOnly:
  GET        /projects/    -> index
  POST       /projects/    -> store   C
  GET        /projects/:id -> show    R
  PUT, PATCH /projects/:id -> update  U
  DELETE     /projects/:id -> destroy D

Route
  .resource('projects', 'ProjectsController')
  .apiOnly()
  .middleware({
    index:   ['auth'],
    store:   ['auth'],
    show:    ['auth', 'ProjectAuth:lider,colaborador'],
    update:  ['auth', 'ProjectAuth:lider,colaborador'],
    destroy: ['auth', 'ProjectAuth:lider,colaborador'],
  })
*/

/*
rutas que crea un NESTED resource (proyecto->item) con apiOnly
  GET        /projects/:project_id/items     -> index
  POST       /projects/:project_id/items     -> store   C
  GET        /projects/:project_id/items/:id -> show    R
  PUT, PATCH /projects/:project_id/items/:id -> update  U
  DELETE     /projects/:project_id/items/:id -> destroy D


Route
  .resource('projects.items', 'ItemsController')
  .apiOnly()
  .middleware({
    index:   ['auth', 'ItemAuth:lider,colaborador'],
    store:   ['auth', 'ItemAuth:lider,colaborador'],
    show:    ['auth', 'ItemAuth:lider,colaborador'],
    update:  ['auth', 'ItemAuth:lider,colaborador'],
    destroy: ['auth', 'ItemAuth:lider,colaborador'],
  })
*/
