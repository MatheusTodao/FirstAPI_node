const UserController = require('./controllers/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.index,
  },

  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: UserController.findById,
  },

  {
    endpoint: '/users',
    method: 'POST',
    handler: UserController.create,
  },

  {
    endpoint: '/users/:id',
    method: 'PUT',
    handler: UserController.update,
  },

  {
    endpoint: '/users/:id',
    method: 'DELETE',
    handler: UserController.delete,
  },

]