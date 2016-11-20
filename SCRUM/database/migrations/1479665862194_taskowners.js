'use strict'

const Schema = use('Schema')

class TaskownersTableSchema extends Schema {

  up () {
    this.create('taskowners', (table) => {
      table.increments()
      table.timestamps()
      table.integer('name_id').unsigned().references('id').inTable('users')
      table.integer('task_id').unsigned().references('id').inTable('tasks')
    })
  }

  down () {
    this.drop('taskowners')
  }

}

module.exports = TaskownersTableSchema
