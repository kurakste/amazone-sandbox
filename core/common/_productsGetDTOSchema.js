'use strict'

const supplierGetSchema = require('../services/api/v1/suppliers/_supplierGetDtoSchema')
const userDtoSchema = require('./_userGetDtoSchema')
const productGetDtoSchema = {
  type: 'object',
  // description: 'Схема товара.',
  required: ['_id', 'id', 'lamazon', 'fba', 'bsr', 'amazon', 'suppliers', 'icomment'],
  properties: {
    _id: {type: 'string', description: 'GUID продукта в базе данных', example: 'a1f43b08-7876-491f-b527-ac4878d0b34b'},
    id: {type: 'string', description: 'ASIN продукта', example: 'B015UKRNGS'},
    material: {type: 'string', description: '', example: 'чугун'},
    currentSupplier: supplierGetSchema,
    currentSupplierId: {type: 'string',nullable: true, description: 'GUID поставщика в базе данных', example: 'a1f43b08-7876-491f-b527-ac4878d0b34b'},
    category: {type: 'string', description: 'Категория'},
    lamazon: {type: 'string', description: 'Ссылка на этот продукт на амазоне.', example: 'www.rbc.ru'},
    lsupplier: {type: 'string', description: 'Ссылка на поставщика.', example: 'www.rbc.ru'},
    bsr: {type: 'number', description: '', example: 2},
    fba: {type: 'boolean', description: 'Признак fba', example: false},
    fbm: {type: 'boolean', description: 'Признак fbm', example: false},
    express: {type: 'boolean', description: 'Признак экспресс доставки.', example: false},
    amazon: {type: 'number', description: '', example: 2341234},
    height: {type: 'number', description: 'Высота', example: 55},
    width: {type: 'number', description: 'Ширина', example: 44},
    length: {type: 'number', description: 'Длинна', example: 33},
    weight: {type: 'number', description: 'Вес', example: 22},
    suppliers: {type: 'array', items: supplierGetSchema},
    reffee: {type: 'number', description: 'комиссия которую берет амазон за любой заказ - 15%', example: 0.15},
    fbafee: {type: 'number', description: 'ФБА комиссия', example: 0.23},
    delivery: {type: 'number', description: 'Стоимость доставки.', example: 3000},
    fbaamount: {type: 'number', description: ' Общая сумма с фба.', example: 23},
    fbalink: {type: 'string', description: 'ФБА ссылка', example: 'link'},
    status: {type: 'number', description: 'Код текущего статуса', example: 0},
    icomment: {type: 'string', description: 'Комментарии к товару.', example: 'Просто коммент.'},
    images: {type: 'array', nullable: true, description: 'Массив картинок.', items: {type: 'string'}},

    checkednotes: {type: 'string', description: '', example: 'коммент к проверке'},
    researcherFine: {type: 'number', description: 'Размер штрафа менеджеру.', example: 200},
    researcherFineComment: {
      type: 'string',
      description: 'Комментарии к штрафу.',
      example: 'Все хорошо,но все нужно переделать.'
    },
    supervisorFine: {type: 'number', description: 'Размер штрафа на супервайзера.', example: 100},
    supervisorFineComment: {type: 'string', description: 'Комментарии к штрафу', example: 'Фсе отлично'},
    dirdecision: {type: 'number', description: 'Код решения директора.', example: 1},
    client: userDtoSchema,
    amazonDescription: {type: 'string', description: 'Описание с сайта амазон.', example: 'описание'},
    amazonDetail: {
      type: 'string',
      description: 'Данные из поля детали с сайта амазон.',
      example: 'Данные из поля детали с сайта амазон.'
    },
    amazonTitle: {type: 'string', description: 'Заголовок на товар с сайта амазон.', example: 'Титул'},
    barCode: {type: 'string', description: 'Баркод'},
    minpurchase: {type: 'number', description: 'Минимальный заказ', example: 23},
    profit: {type: 'number', description: 'Прибыль'},
    margin: {type: 'number', description: 'Маржа'},
    byboxprice: {type: 'number', description: 'Цена', example: 54.2},

    createdBy: userDtoSchema,
    createdAt: {type: 'string', format: 'date-time', description: 'Дата создания'},
    updatedAt: {type: 'string', format: 'date-time', description: 'Дата изменения'},
    checkedAt: {type: 'string', format: 'date-time', description: 'Дата проверки'},
    buyer: userDtoSchema,
    buyersComment: {
      type: 'string',
      description: 'Комментарии к товару от байера.',
      example: 'Просто коммент от байера.'
    },
    researcherRate: {type: 'number', description: 'Савка ресечера.'},
    supervisorRate: {type: 'number', description: 'Савка супервайзера.'},
    paidAt: {type: 'string', format: 'date-time', description: 'Дата оплаты'},
    buyerRate: {type: 'number', description: 'Савка байера.'},


    // // У страницы продукта добавлена новая вкладка "Листинг", необходимо подключить новые поля к апи.
    // //  Редактировать сможет супервайзер.
    listingName: {type: 'string', description:''},//  - строка
    listingBulletPoints: {type: 'array', nullable: true, description: 'Массив ...', items: {type: 'string'}}, // -массив строк
    listingProductDetails: {type: 'string', description:''},//- строка
    listingSearchTerms: {type: 'string', description:''},//- строка
    listingSubjectMatters: {type: 'array', nullable: true, description: 'Массив ...', items: {type: 'string'}},//- массив строк
    listingImages: {type: 'array', nullable: true, description: 'массив картинок(в виде прямых ссылок).', items: {type: 'string'}}, // - массив картинок(в виде прямых ссылок)
    listingTaskToFindSupplier: {type: 'string', description:''}, // - строка
    listingSupplierImportantPoints: {type: 'string', description:''}, //-строка
    listingExtraInfo: {type: 'string', description:''}, //-- строка
    listingSupplierCompetitors: {type: 'string', description:''}, //--строка

    strategyStatus:{type: 'number', default: 0, description: 'У поля на данный момент будет 5 возможных значений: 0, 10, 20, 30, 40'},
  }
}

module.exports = productGetDtoSchema
