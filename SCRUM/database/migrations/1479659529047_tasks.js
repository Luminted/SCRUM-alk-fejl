'use strict'

const Schema = use('Schema')

class TasksTableSchema extends Schema {

  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.timestamps()
      table.string('title',80)
      table.string('category',80)
      table.string('description',200)
      table.integer('isDone');
    })
  }

  down () {
    this.drop('tasks')
  }

}

module.exports = TasksTableSchema
