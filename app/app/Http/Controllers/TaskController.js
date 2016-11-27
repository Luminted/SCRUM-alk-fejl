'use strict'

const Task = use('App/Model/Task')
const User = use('App/Model/User')
const Validator = use('Validator')
const Undertaking = use('App/Model/Undertaking')
const Category = use('App/Model/Category')
const Database = use('Database')

class TaskController {
    *viewTasks(req, res) {
        const userId = yield req.session.get('adonis-auth');
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
        const notUndertakenTasks = yield Database.from('tasks').whereNotIn('id', undertakenTaskIds);

        for (let task of [...undertakenTasks, ...notUndertakenTasks]) {
            const categoryName = yield Database.select('name').from('categories').where('id', task.category_id);
            task.category = categoryName[0]['name'];
        }

        yield res.sendView('viewTasks', { notUndertakenTasks, undertakenTasks });
    }

    *takeTask(req, res) {
        const userId = yield req.session.get('adonis-auth');
        const taskId = req.input('task_id');

        const undertaking = new Undertaking
        undertaking.user_id = userId
        undertaking.task_id = taskId;

        yield undertaking.save();
        res.redirect('/tasks/view')
    }

    *completeTask(req, res) {
        const taskId = req.input('task_id')

        const task = yield Task.query().where('id', taskId).first()

        yield task.delete()
        yield res.redirect('/tasks/userTasks')
    }

    *renderAddTask(req,res){
        const categories = yield Category.all()

        yield res.sendView('addTask', {categories: categories.toJSON()})
    }

    *addTask(req,res){
        const inputData = req.all()

        const rules = {
            'title': 'required|min:1',
            'description': 'required|min:1',
        }

        const validation = yield Validator.validateAll(inputData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/tasks/add')
            return
        }

        const task = new Task()
        task.title = inputData.title;
        task.description = inputData.description;
        task.category_id = inputData.category
        
        yield task.save()

        res.redirect('/tasks/view')
    }

    *deleteTask(req,res){
        const taskId = req.input('task_id')

        const task = yield Task.query().where('id', taskId).first()

        yield task.delete()
        yield res.redirect('/tasks/view')
    }
}

module.exports = TaskController
