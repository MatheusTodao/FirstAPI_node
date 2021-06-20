let users = require('../mocks/users.js');

module.exports = {
  index(request, response) {
    const { orderBy } = request.query;
    const sortedUsers = users.sort((a, b) => {
      if (orderBy === 'desc') {
        return a.id < b.id ? 1 : -1;
      }
        
      return a.id > b.id ? 1 : -1;
    });

    response.send(200, sortedUsers)
  },

  findById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));
    
    if (!user) {
      response.send(404, { error: `user id (${id}) is not valid`});
    } else {
      response.send(200, user);
    }
  },

  create(request, response) {
    const body = request.body;
    const lastUserId = users[users.length - 1].id;
    const newUser = {
      id: lastUserId + 1,
      name: body.name,
    };

    users.push(newUser);
    response.send(200, newUser);
  },

  update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const userExists = users.find((user => user.id === Number(id)));
    if (!userExists) {
      return response.send(404, { error: 'User not exists' })
    }

    users = users.map((user) => user.id === Number(id) ? {...user, name} : user);

    response.send(200, {id, name});
  },

  delete(request, response) {
    const { id } = request.params;
    
    users = users.filter((user) => user.id !== Number(id));

    response.send(200, { deleted: 'success'});
  }

}
