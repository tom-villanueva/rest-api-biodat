import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('users/register', 'AuthController.store').as('register');
  Route.post('users/login',    'AuthController.login').as('login');
  Route.post('users/logout',   'AuthController.logout').as('logout');
  Route.get('users/:id',       'AuthController.show').as('profile').middleware('auth');
}).prefix('api/');

/*
rutas que crea resource con apiOnly:
  GET        /projects/    -> index
  POST       /projects/    -> store   C
  GET        /projects/:id -> show    R
  PUT, PATCH /projects/:id -> update  U
  DELETE     /projects/:id -> destroy D
*/
Route
  .resource('projects', 'ProjectsController')
  .apiOnly()
  .middleware({
    index:   ['auth'], 
    store:   ['auth'],
    update:  ['auth', 'ProjectAuth:lider,colaborador'],
    show:    ['auth', 'ProjectAuth:lider,colaborador'],
    destroy: ['auth', 'ProjectAuth:lider,colaborador'],
  })

   
  