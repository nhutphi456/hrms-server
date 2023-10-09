const { faker } = require("@faker-js/faker");

const positions = [
  {
    id: 1,
    name  : "Frontend Developer",
  },
  {
    id: 2,
    name  : "Backend Developer",
  },
  {
    id: 3,
    name  : "Business Analyst",
  },
];

const departments = [
  {
    id: 1,
    name  : "Software Development",
  },
  {
    id: 2,
    name  : "Design",
  },
  {
    id: 3,
    name  : "Quality Assurance",
  },
]
const mockSum = {
  id: 832,
  firstName: "Ariel",
  lastName: "Kuhlman",
  email: "Alec.Reilly@hotmail.com",
  gender: "Female",
  dateOfBirth: "2023-07-25T13:32:29.303Z",
  address: "82661 Beahan Junctions",
  phoneNumber: "592.644.1327 x0271",
  positionLevel: positions[Math.floor(Math.random() * positions.length)],
  dateJoined: "2022-11-05T14:53:50.864Z",
  currentContract: 0,
  profileBio:
    "Aequus argumentum ipsam dolorem speciosus vis valens pauper clementia. Caterva advoco cur. Cedo xiphias delego verus pel carbo patior vesco depono.",
  facebookLink: "https://even-accent.com",
  twitterLink: "https://unaware-kingdom.info",
  linkedinLink: "https://white-gang.biz",
  instagramLink: "https://flimsy-figurine.name/",
};
// Helper function to generate a random number within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Generate a mock Employee object
function generateMockEmployee() {
  const mockData = [];

  for (let i = 1; i <= 40; i++) {
    const employee = {
      id: i,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      dateOfBirth: faker.date.past().toISOString(),
      address: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      positionLevel: positions[Math.floor(Math.random() * positions.length)],
      dateJoined: faker.date.past().toISOString(),
      currentContract: getRandomInt(0, 2),
      profileBio: faker.lorem.paragraph(),
      facebookLink: faker.internet.url(),
      twitterLink: faker.internet.url(),
      linkedinLink: faker.internet.url(),
      instagramLink: faker.internet.url(),
      status: faker.helpers.arrayElement([0, 1]),
      department: generateMockDepartment(),
      avatarImg: faker.image.avatar(),
      emergencyContacts: [generateMockEmergencyContact(), generateMockEmergencyContact()],
      employeeSkills: [
        {
          id: getRandomInt(1, 50),
          skill: { skillName: "HTML" },
        },
        {
          id: getRandomInt(1, 50),
          skill: { skillName: "CSS" },
        },
        {
          id: getRandomInt(1, 50),
          skill: { skillName: "JAVASCRIPT" },
        },
      ],
      employeeProjects: [
        {
          projectName: 'SAG',
          projectManager: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
          },
          engageManager: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
          }
        }
      ]
    };

    mockData.push(employee);
  }

  return mockData;
}

// Generate a mock Department object
function generateMockDepartment() {
  const randomIndex = Math.floor(Math.random() * departments.length)
  return {
    id: departments[randomIndex].id,
    departmentName: departments[randomIndex].name,
    sum: mockSum,
  };
}

// Generate a mock EmployeeSkill object
function generateMockEmployeeSkill() {
  return {
    id: getRandomInt(1, 100),
    skill: generateMockSkill(),
    proficiencyLevel: generateMockProficiencyLevel(),
  };
}

// Generate a mock Skill object
function generateMockSkill() {
  return {
    id: getRandomInt(1, 200),
    skillName: faker.helpers.arrayElement(["HTML", "CSS", "JAVASCRIPT"]),
    skillSet: generateMockSkillSet(),
  };
}

// Generate a mock SkillSet object
function generateMockSkillSet() {
  return {
    id: getRandomInt(1, 50),
    skillSetName: faker.random.word(),
    competency: generateMockCompetency(),
  };
}

// Generate a mock Competency object
function generateMockCompetency() {
  return {
    id: getRandomInt(1, 30),
    competencyName: faker.random.word(),
    description: faker.lorem.sentence(),
    competencyGroup: generateMockCompetencyGroup(),
  };
}

// Generate a mock CompetencyGroup object
function generateMockCompetencyGroup() {
  return {
    id: getRandomInt(1, 10),
    competencyGroupName: faker.random.word(),
  };
}

// Generate a mock ProficiencyLevel object
function generateMockProficiencyLevel() {
  return {
    id: getRandomInt(1, 5),
    ProficiencyLevelName: faker.random.word(),
    Weight: getRandomInt(1, 10),
  };
}
function generateMockEmergencyContact() {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
  };
}
// Example of generating a mock Employee object
const mockEmployee = generateMockEmployee();
// console.log(mockEmployee);

// Example of generating a mock Department object
// const mockDepartment = generateMockDepartment();
// console.log(mockDepartment);

// Example of generating a mock EmployeeSkill object
// const mockEmployeeSkill = generateMockEmployeeSkill();
// console.log(mockEmployeeSkill);

module.exports = { mockEmployee, positions, departments, mockSum };
