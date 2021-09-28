'use strict'
const prefix = '/api/v1'
const routeAccessMatrix = [
  {method: 'GET', url: `${prefix}/advertising`, ref_adm_scope_id: 2 }

]

function isThisPassAllowedForThisScope(method, path, scope) {

  return true
}

module.exports = isThisPassAllowedForThisScope
