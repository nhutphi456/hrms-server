const {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
} = require("graphql");

const Employee = new GraphQLObjectType({
  name: "Employee",
  description: "An employee object",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    address: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    positionLevel: { type: Position },
    dateJoined: { type: GraphQLString },
    currentContract: { type: GraphQLInt },
    profileBio: { type: GraphQLString },
    facebookLink: { type: GraphQLString },
    twitterLink: { type: GraphQLString },
    linkedinLink: { type: GraphQLString },
    instagramLink: { type: GraphQLString },
    department: { type: Department },
    status: { type: GraphQLInt },
    avatarImg: { type: GraphQLString },
    emergencyContacts: { type: new GraphQLList(EmergencyContact) },
    employeeSkills: { type: new GraphQLList(EmployeeSkill) },
    employeeProjects: { type: new GraphQLList(EmployeeProject) },
  }),
});

const Position = new GraphQLObjectType({
  name: "Position",
  description: "A position object",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

const Department = new GraphQLObjectType({
  name: "Department",
  description: "A department object",
  fields: () => ({
    id: { type: GraphQLInt },
    departmentName: { type: GraphQLString },
    sum: { type: Employee },
  }),
});

const EmergencyContact = new GraphQLObjectType({
  name: "EmergencyContact",
  description: "An emergency contact object",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
  }),
});

const EmployeeProject = new GraphQLObjectType({
  name: "EmployeeProject",
  description: "An employee project object",
  fields: () => ({
    id: { type: GraphQLInt },
    project: { type: Project },
    employee: { type: Employee },
  }),
});
const Project = new GraphQLObjectType({
  name: "Project",
  description: "A project object",
  fields: () => ({
    id: { type: GraphQLInt },
    projectName: { type: GraphQLString },
    projectManager: { type: Employee },
    engageManager: { type: Employee },
  }),
});
const CompetencyGroup = new GraphQLObjectType({
  name: "CompetencyGroup",
  description: "A competency group object",
  fields: () => ({
    id: { type: GraphQLInt },
    competencyGroupName: { type: GraphQLString },
  }),
});
const Competency = new GraphQLObjectType({
  name: "Competency",
  description: "A competency object",
  fields: () => ({
    id: { type: GraphQLInt },
    competencyName: { type: GraphQLString },
    description: { type: GraphQLString },
    competencyGroup: { type: CompetencyGroup },
  }),
});
const SkillSet = new GraphQLObjectType({
  name: "SkillSet",
  description: "A skill set object",
  fields: () => ({
    id: { type: GraphQLInt },
    skillSetName: { type: GraphQLString },
    competency: { type: Competency },
  }),
});
const Skill = new GraphQLObjectType({
  name: "Skill",
  description: "A skill object",
  fields: () => ({
    id: { type: GraphQLInt },
    skillName: { type: GraphQLString },
    // skillSet: { type: SkillSet },
  }),
});
const EmployeeSkill = new GraphQLObjectType({
  name: "EmployeeSkill",
  description: "An employee skill object",
  fields: () => ({
    // id: { type: GraphQLInt },
    skill: { type: Skill },
    // proficiencyLevel: { type: ProficiencyLevel },
  }),
});
const ProficiencyLevel = new GraphQLObjectType({
  name: "ProficiencyLevel",
  description: "A proficiency level object",
  fields: () => ({
    id: { type: GraphQLInt },
    ProficiencyLevelName: { type: GraphQLString },
    Weight: { type: GraphQLInt },
  }),
});
const EmployeeList = new GraphQLObjectType({
  name: "EmployeeList",
  fields: () => ({
    // page: { type: GraphQLInt },
    // per_page: { type: GraphQLInt },
    // total_pages: { type: GraphQLInt },
    // total_items: { type: GraphQLInt },
    pagination: {
      type: new GraphQLObjectType({
        name: "Pagination",
        fields: {
          pageNo: { type: GraphQLInt },
          pageSize: { type: GraphQLInt },
          totalPages: { type: GraphQLInt },
          totalItems: { type: GraphQLInt },
        },
      }),
      resolve: (parent) => parent.pagination,
    },
    data: { type: new GraphQLList(Employee) },
  }),
});
const EmployeeInputType = new GraphQLInputObjectType({
  name: "EmployeeInput",
  fields: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    address: { type: GraphQLString },
    currentContract: { type: GraphQLInt },
    gender: { type: GraphQLString },
    departmentId: { type: GraphQLInt },
    avatarImg: { type: GraphQLString },
    positionLevelId: { type: GraphQLInt },
    facebookLink: { type: GraphQLString, defaultValue: "" },
    twitterLink: { type: GraphQLString, defaultValue: "" },
    instagramLink: { type: GraphQLString, defaultValue: "" },
    linkedinLink: { type: GraphQLString, defaultValue: "" },
    profileBio: { type: GraphQLString }
  },
});

const EmployeeUpdateInputType = new GraphQLInputObjectType({
  name: "EmployeeUpdateInput",
  fields: {
    id: { type: GraphQLInt }, // The ID of the employee to update
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    gender: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    address: { type: GraphQLString },
    positionLevelId: { type: GraphQLInt },
    profileBio: { type: GraphQLString },
    departmentId: { type: GraphQLInt },
    avatarImg: { type: GraphQLString },
    twitterLink: { type: GraphQLString },
    facebookLink: { type: GraphQLString },
    instagramLink: { type: GraphQLString },
    linkedinLink: { type: GraphQLString },
  },
});

module.exports = { Employee, EmployeeList, EmployeeInputType, EmployeeUpdateInputType };
