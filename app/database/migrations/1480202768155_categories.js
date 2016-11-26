'use strict'

const Schema = use('Schema')

class CategoriesTableSchema extends Schema {

  up () {
    this.create('categories', (table) => {
      table.increments()
      table.timestamps()
      table.string('title',80)
      table.text('description',100)
      table.integer('category_id')
    })
  }

  down () {
    this.drop('categories')
  }

}

module.exports = CategoriesTableSchema
