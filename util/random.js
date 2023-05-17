const { faker } = require('@faker-js/faker')

exports.getRndNumber = (min, max) => {
  return faker.number.int({ min: min, max: max})
}

exports.getRndUser = () => {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: '$2y$12$MdnEap0Qen39OV95nzt6k.z/x1kvES3DgvXWayezBAGw6f.lIJO7i', //123456789
    createdAt: faker.date.past({ years: 3 }),
    updatedAt: faker.date.recent({ days: 20})
  } 
}

exports.getRndProject = (userIdRange) => {
  return {
    title: faker.internet.domainWord(),
    description: `${faker.hacker.adjective()} ${faker.hacker.noun()} to ${faker.hacker.verb()} ${faker.hacker.ingverb()}.`,
    private: faker.datatype.boolean({ probability: 0.3 }),
    authorId: faker.number.int({ min: userIdRange.min, max: userIdRange.max}),
    createdAt: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent({ days: 60}) 
  }
}

const getRndAssignee = (idRange) => {
  return {
    projectId: faker.number.int({ min: idRange.min, max: idRange.max}), 
    userId: faker.number.int({ min: idRange.min, max: idRange.max }) 
  }
}

exports.getRndAssignees = (amount, idRange) => {
  return Array(amount).fill(getRndAssignee())
}

