'use strict'

const Validator = use('Validator')
const Hash = use('Hash')
const Category = use('App/Model/Category')
const User = use('App/Model/User')
const Task = use('App/Model/Task')
const Taskowner = use('App/Model/Taskowner')

class TaskController {

    * addTask(req,res){
        const categories = yield Category.all()
        
        yield res.sendView('addtask', {
            categories: categories.toJSON()
        });
    }

    * doAddTask(req,res){
        const usersData = yield User.all()
        const taskData = yield req.all();
        const category = yield Category.findBy('id', taskData.category);

        const rules = {
            'title': 'required',
            'desc': 'required',
        }

        const validation = yield Validator.validateAll(taskData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/task/add')
            return
        }

        const task = new Task()
        task.title = taskData.title
        task.category = category.name
        task.description = taskData.desc
        task.isDone = 0

        yield task.save()

        res.redirect(`/task/add`);
    }

    *viewTasks(req,res){
        const tasks = yield Task.all();

        yield res.sendView('viewtasks', {tasks: tasks.toJSON()});
    }

    *takeTask(req,res){
        const postData = yield req.all();

        const taskowner = new Taskowner()
        taskowner.name_id = postData.user_id;
        taskowner.task_id = postData.task_id;

        yield taskowner.save()

        yield res.redirect('/task/view')
    }
}



module.exports = TaskController
