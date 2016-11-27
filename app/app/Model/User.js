'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  undertakings(){
    return this.hasMany('App/Model/Undertaking')
  }

}

module.exports = User
