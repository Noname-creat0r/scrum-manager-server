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
    description: faker.helpers.multiple(
      faker.hacker.phrase, { count: { min: 3, max: 10 } }
    ).join('.'),
    private: faker.datatype.boolean({ probability: 0.3 }),
    authorId: faker.number.int({ min: userIdRange.min, max: userIdRange.max}),
    createdAt: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent({ days: 60}) 
  }
}

exports.getRndBacklog = (projectId) => {
  return {
    projectId: projectId,
    createdAt: faker.date.past({ years: 1}),
    updatedAt: faker.date.recent({ days: 30}) 
  }
}

const getRndAssignee = (idRange) => {
  return {
    projectId: faker.number.int({ min: idRange.min, max: idRange.max}), 
    userId: faker.number.int({ min: idRange.min, max: idRange.max }) 
  }
}

exports.getRndTask = (statusIdRange, bp, ip, projectId, iterationId = null) => {
  return {
    title: `${faker.hacker.verb()} ${faker.hacker.abbreviation()} ${faker.hacker.noun()}`,
    description: faker.lorem.slug(10),
    statusId: faker.number.int({ min: statusIdRange.min, max: statusIdRange.max}),
    projectId: projectId,
    iterationId: iterationId,
    storyPoints: faker.number.int({ min: 1, max: 20 }),
    bContainerPos: bp,
    iContainerPos: ip,
    createdAt: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent({ days: 60})
  } 
}

exports.getRndIteration = (projectId) => {
  return {
    title: faker.hacker.ingverb(),
    description: faker.lorem.paragraph(2),
    projectId: projectId,
    createdAt: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent({ days: 60})
  }
}
