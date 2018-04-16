class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = {id, name, room}
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    let users = this.users.filter((user) => {
      return user.id === id;
    });
    if(users.length === 0){
      return null;
    }else {
      this.users = this.users.filter((user) => {
        return user.id !== id;
      });
      return users[0];
    }
  }
  getUser(id) {
    let users = this.users.filter((user) => {
      return user.id === id;
    })
    if(users.length === 0){
      return null;
    } else {
      return users[0];
    }
  }
  getUserList(room) {
    let users = this.users.filter((user) => {
      return user.room === room;
    });
    let names = users.map((user) => {
      return user.name;
    });
    return names;
  }
}

module.exports = {
  Users
}
