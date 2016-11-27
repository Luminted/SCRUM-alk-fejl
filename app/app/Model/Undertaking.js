'use strict'

const Lucid = use('Lucid')

class Undertaking extends Lucid {
    task(){
        return this.belongsTo('App/Model/Task')
    }

    user(){
        return this.belongsTo('App/Model/User')
    }

}

module.exports = Undertaking
