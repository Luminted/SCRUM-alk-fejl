'use strict'

const Schema = use('Schema')

class TasksTableSchema extends Schema {

  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.timestamps()
      table.string('title',80)
      table.text('description',100)
      table.integer('category_id').notNullable()
    })
  }

  down () {
    this.drop('tasks')
  }

}

module.exports = TasksTableSchema
