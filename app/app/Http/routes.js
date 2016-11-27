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

Route.on('/').render('main')

Route.get('/login', 'UserController.renderLogin')
Route.post('/login', 'UserController.login')

Route.get('/register', 'UserController.renderRegistration')
Route.post('/register', 'UserController.register')

Route.get('logout', 'UserController.logout')

Route.get('/tasks/view', 'TaskController.viewTasks')
Route.post('/tasks/take', 'TaskController.takeTask')

Route.get('/tasks/userTasks', 'UserController.userTasks');
Route.post('/tasks/userTasks/abandon', 'UserController.abandonTask')
Route.post('/tasks/userTasks/complete', 'TaskController.completeTask')

Route.get('/editUser', 'UserController.renderEditPage')
Route.post('/editUser', 'UserController.editUser')

Route.get('/tasks/add', 'TaskController.renderAddTask')
Route.post('/tasks/add', 'TaskController.addTask')

Route.post('tasks/delete', 'TaskController.deleteTask')