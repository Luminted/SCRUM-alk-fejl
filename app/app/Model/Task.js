'use strict'

const Lucid = use('Lucid')

class Task extends Lucid {
    category(){
        return this.belongsTo('App/Model/Category')
    }

    undertakings(){
        return this.hasMany('App/Model/Undertaking')
    }
}

module.exports = Task
