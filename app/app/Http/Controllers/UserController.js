'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Undertaking = use('App/Model/Undertaking')
const Category = use('App/Model/Category')
const Database = use('Database')
const Hash = use('Hash')

class UserController {



    *renderLogin(req, res) {
        yield res.sendView('login');
    }

    *renderRegistration(req, res) {
        yield res.sendView('register');
    }

    * register(req, res) {
        const userData = req.all()

        const rules = {
            'email': 'required|email',
            'name': 'required',
            'password': 'required|min:1',
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

        try {
            yield user.save()
        } catch (e) {
            yield req
                .with({ error: 'Incorrect registration!' })
                .flash()
                res.redirect('/register')
                return
        }
        try {
            yield req.auth.login(user)
        } catch (e) {
            yield req
                .with({ error: 'Incorrect login!' })
                .flash()
                res.redirect('/register')
                return
        }


        res.redirect('/')
    }

    * login(req, res) {
        const email = req.input('email')
        const password = req.input('password')

        try {
            yield req.auth.attempt(email, password)
            res.redirect('/')
        } catch (ex) {
            yield req
                .with({ error: 'Incorrect login!' })
                .flash()

            res.redirect('/login')
        }
    }

    * logout(req, res) {
        yield req.auth.logout()

        res.redirect('/')
    }

    *userTasks(req,res){
        const userId = yield req.session.get('adonis-auth')
        const userUndertakings = yield Undertaking.query().where('user_id', userId);
        const undertakenTaskIds = []

        for (let undertaking of userUndertakings) {
            Object.keys(undertaking).map(key => {
                if (key === 'task_id') {
                    undertakenTaskIds.push(undertaking[key]);
                }
            })
        }

        const undertakenTasks = yield Database.from('tasks').whereIn('id', undertakenTaskIds);

        for (let task of undertakenTasks) {
            const categoryName = yield Database.select('name').from('categories').where('id', task.category_id).first();
            task.category = categoryName['name'];
        }

        yield res.sendView('userTasks', {undertakenTasks})
    }

    *abandonTask(req,res){
        const userId = yield req.session.get('adonis-auth')
        const taskId = req.input('task_id')

        const undertaking = yield Undertaking.query().where('task_id',  taskId).where('user_id', userId).first()

        yield undertaking.delete()
        yield res.redirect('/tasks/userTasks')
    }

    *renderEditPage(req,res){
        yield res.sendView('editUser');
    }

    *editUser(req,res){
        const userId = yield req.session.get('adonis-auth')
        const inputData = req.all();
        
        const rules = {
            'name': 'required|min:1',
            'password': 'required|min:1',
            'password_again': 'required|same:password'
        }

        const validation = yield Validator.validateAll(inputData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/editUser')
            return
        }

        const user = yield Database
            .table('users')
            .where('id', userId)
            .update({username: inputData.name, password: yield Hash.make(inputData.password)})

        yield req.auth.login(user)
        yield res.redirect('/editUser');

    }

}

module.exports = UserController
