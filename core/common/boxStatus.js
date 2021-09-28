'use strict'
// TODO: проработать все статусы.
const boxStatuses = {
  new: 0, // клиент видит. Может перекомпоновать. ТОгад сбросить в 0
  buyerSendToStorekeeper: 20, // здесь сбросим в 20
  warehouseChecksSises: 22,
  clientSendNewTaskForBox: 25, // здесь сбросим в 20
  readyToSend: 40,
  wasSend: 40
}

module.exports = boxStatuses
