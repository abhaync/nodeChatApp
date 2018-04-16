const expect = require('expect');
const {Users} = require('./Users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Abhay',
      room: 'Node'
    },
    {
      id: 2,
      name: 'Hamzah',
      room: 'Big Data'
    },
    {
      id: 3,
      name: 'Swarna',
      room: 'Node'
    },
  ]
  })

  it('should add new user', () => {
    let users = new Users();
    const user = {
      id: '123',
      name: 'Abhay',
      room: 'Devs'
    }
    let resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  })

  it('should remove a user', () => {
    const user = users.removeUser(2);
    expect(user).toEqual({
      id: 2,
      name: 'Hamzah',
      room: 'Big Data'
    });
    expect(users.users.length).toBe(2);
  })

  it('should not remove a user', () => {
    const user = users.removeUser(26);
    expect(user).toBe(null);
    expect(users.users.length).toBe(3);
  })

  it('should find user', () => {
    const user = users.getUser(1);
    expect(user).toEqual({
      id: 1,
      name: 'Abhay',
      room: 'Node'
    })
  })

  it('should not find a user', () => {
    const user = users.getUser(54);
    expect(user).toBe(null);
  })

  it('should return names for node course', () => {
    const userList = users.getUserList('Node');
    expect(userList).toEqual(['Abhay','Swarna']);
  })

  it('should return names for Big Data course', () => {
    const userList = users.getUserList('Big Data');
    expect(userList).toEqual(['Hamzah']);
  })
})
