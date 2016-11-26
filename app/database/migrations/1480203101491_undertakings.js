'use strict'

const Schema = use('Schema')

class UndertakingsTableSchema extends Schema {

  up () {
    this.create('undertakings', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').notNullable()
      table.integer('task_id').notNullable()
    })
  }

  down () {
    this.drop('undertakings')
  }

}

module.exports = UndertakingsTableSchema
