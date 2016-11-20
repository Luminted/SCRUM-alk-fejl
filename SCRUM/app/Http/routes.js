'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/',  function * (req,res){
    yield res.sendView('main');
})

Route.get('/register', 'UserController.register');
Route.post('/register', 'UserController.doRegister');

Route.get('/login', 'UserController.login');
Route.post('/login', 'UserController.doLogin');
Route.get('/logout', 'UserController.doLogout')

Route.get('task/add', 'TaskController.addTask')
Route.post('task/add', 'TaskController.doAddTask')
Route.get('task/view', 'TaskController.viewTasks')
Route.post('task/take', 'TaskController.takeTask')

//Route.get('/user/:id', 'UserController.user')