'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    tasks(){
        return this.hasMany('App/Model/Task')
    }
}

module.exports = Category
