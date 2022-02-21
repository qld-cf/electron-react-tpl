const { User } = require('../sequelize')
/**
 * Returns all Users
 * @method getAllUsers
 * @returns {Array<NewUser>} All Users belonging to User Model
 */
const getAllUsers = async () => {
  const users = await User.findAll()
  return users
}

/**
 * Returns all Users
 * @method createUser
 * @param {NewUser} user the user object
 * @returns {NewUser} the created User Object
 */
const createUser = async user => {
  const retData = await User.create(user)
  const addedUser = {
    firstName: retData.firstName,
    lastName: retData.lastName,
    id: retData.id
  }
  return addedUser
}

export { getAllUsers, createUser }
