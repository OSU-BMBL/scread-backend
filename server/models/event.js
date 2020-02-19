import db from '../config/db.js'
const eventModel = '../schema/matrix.js'
const EventDb = db.Todolist

// use sequelize to import table structure
const Event = EventDb.import(eventModel)

const getEventById = async function(id) {
  // note is is async function and async statement
  const eventInfo = await Event.findOne({
    // use await control async process, return data from Promise object
    where: {
      base_id: id
    }
  })

  return eventInfo // return data
}

export default {
  getEventById // will used in controller
}
