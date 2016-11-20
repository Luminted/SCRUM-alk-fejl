'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Taskowner = use('App/Model/Taskowner')
const Task = use('App/Model/Task')
const Hash = use('Hash')

class UserController {
    * register(req, res) {
        yield res.sendView('register')
    }

    * login(req, res) {
        yield res.sendView('login')
    }

    * doRegister(req, res) {
        const userData = req.all()

        const rules = {
            'email': 'required|email',
            'name': 'required',
            'password': 'required|min:4',
            'password_again': 'required|same:password'
        }

        const validation = yield Validator.validateAll(userData, rules)

        if (validation.fails()) {
            yield req
                .withOut('password', 'password_again')
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/register')
            return
        }

        const user = new User
        user.username = userData.name
        user.email = userData.email
        user.password = yield Hash.make(userData.password)

        yield user.save()
        yield req.auth.login(user)

        res.redirect('/')
    }

    * doLogin(req, res) {
        const email = req.input('email')
        const password = req.input('password')

        try {
            yield req.auth.attempt(email, password)
            res.redirect('/')
        } catch (ex) {
            yield req
                .with({ error: 'Invalid login' })
                .flash()

            res.redirect('/login')
        }
    }

    * doLogout(req, res) {
        yield req.auth.logout()

        res.redirect('/')
    }

    *user(req, res) {
        const tasks = yield Task.all();
        const userId = req.param('id');
        const userTaskIds = yield Taskowner.all()
        console.log(Array.from(tasks) + '\n\n\n\n')
        let userTasks = [];

        for (let id of userTaskIds) {
            for (let task of tasks) {
                userTasks.push(id.task_id)
                userTasks.push(task.id)
                if (id.task_id === task.id || id.name_id === userId) {
                    //userTasks.push(task);
                }
            }
        }

        yield res.send({userTasks})
        //yield res.sendView('user', { userTasks: userTasks });
    }
}

module.exports = UserController
