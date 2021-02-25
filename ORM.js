/************************ DB DUMMY CALL  *********************** */
const uniqid = require('uniqid')
function ORM () {
  let _db_table = []

  function create (book) {
    const now = new Date()
    const createdBook = {
      ...book,
      id: uniqid(),
      createdAt: now,
      updatedAt: now
    }
    _db_table.push(createdBook)
    return createdBook
  }

  function findAll () {
    return { result: _db_table, count: _db_table.length }
  }

  function destroy (id) {
    let new_dummy_data = _db_table.filter(filterItem(id))
    _db_table = new_dummy_data
    return id
  }

  function findOne (id) {
    let item = _db_table.find(findItem(id))
    return item
  }

  function update (data) {
    let updatedItem = null
    let updated_data = _db_table.map(item => updateItem(item, data))

    _db_table = updated_data
    return updatedItem
  }

  return {
    create,
    update,
    destroy,
    findOne,
    findAll
  }
}
function updateItem (data) {
  if (item.id === data.id) {
    updatedItem = { ...item, ...data, updatedAt: new Date() }
    return updatedItem
  }
  return updatedItem
}

function findItem (item, id) {
  return item.id === id
}
function filterItem (item, id) {
  return item.id !== id
}

module.exports = ORM
