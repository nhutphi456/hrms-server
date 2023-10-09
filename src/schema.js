const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType,
} = require("graphql");
const { employees } = require("./data/employees");
const { mockEmployees } = require("./data/mockEmployee");
// const GraphQLUpload = await import('graphql-upload/GraphQLUpload.mjs');
// import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
const { createWriteStream } = require("fs");

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    name: { type: GraphQLString },
    workAs: { type: GraphQLString },
    skillTags: { type: GraphQLList(GraphQLString) },
    contributedHours: { type: GraphQLInt },
  }),
});

// Define EmergencyContactType
const EmergencyContactType = new GraphQLObjectType({
  name: "EmergencyContact",
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    gender: { type: GraphQLString },
    dob: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    address: { type: GraphQLString },
    reportTo: { type: GraphQLString },
    position: { type: GraphQLString },
    currentContract: { type: GraphQLString },
    status: { type: GraphQLInt },
    department: { type: GraphQLString },
    skillsTags: { type: GraphQLList(GraphQLString) },
    avatarImg: { type: GraphQLString },
    joinedProjects: { type: GraphQLList(ProjectType) },
    emergencyContacts: { type: GraphQLList(EmergencyContactType) },
    bio: { type: GraphQLString },
  },
});

const EmployeeListType = new GraphQLObjectType({
  name: "EmployeeList",
  fields: () => ({
    page: { type: GraphQLInt },
    per_page: { type: GraphQLInt },
    total_pages: { type: GraphQLInt },
    total_items: { type: GraphQLInt },
    data: { type: new GraphQLList(EmployeeType) },
  }),
});

const EmployeeInputType = new GraphQLInputObjectType({
  name: "EmployeeInput",
  fields: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dob: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    currentContract: { type: GraphQLString },
    gender: { type: GraphQLString },
    department: { type: GraphQLString },
    avatarImg: { type: GraphQLString },
    position: { type: GraphQLString },
    socialAccounts: {
      type: new GraphQLInputObjectType({
        name: "SocialAccountsInput",
        fields: {
          facebook: { type: GraphQLString },
          twitter: { type: GraphQLString },
          github: { type: GraphQLString },
          linkedin: { type: GraphQLString },
        },
      }),
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    employee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        const employeeId = args.id;
        return mockEmployees.find((employee) => employee.id === employeeId);
      },
    },
    employees: {
      type: EmployeeListType,
      args: {
        status: { type: GraphQLInt, defaultValue: null },
        departments: { type: GraphQLString, defaultValue: "" },
        currentContracts: { type: GraphQLString, defaultValue: "" },
        page: { type: GraphQLInt, defaultValue: 1 },
        per_page: { type: GraphQLInt, defaultValue: 10 },
      },
      resolve(parent, args) {
        // if (!Object.values(args).some((arg) => arg !== undefined && arg !== null)) {
        //   return {
        //     page: args.page,
        //     per_page: args.per_page,
        //     total_pages: 1,
        //     total_items: mockEmployees.length,
        //     data: mockEmployees,
        //   };
        // }

        let filteredEmployees = mockEmployees;

        if (args.status !== undefined && args.status !== null) {
          filteredEmployees = filteredEmployees.filter(
            (employee) => employee.status === args.status
          );
        }

        if (args.departments !== undefined && args.departments !== "") {
          filteredEmployees = filteredEmployees.filter((employee) =>
            args.departments.split(",").includes(employee.department)
          );
        }

        if (args.currentContracts !== undefined && args.currentContracts !== "") {
          filteredEmployees = filteredEmployees.filter((employee) =>
            args.currentContracts.split(",").includes(employee.currentContract)
          );
        }

        const totalItems = filteredEmployees.length;
        const totalPages = Math.ceil(totalItems / args.per_page);

        return {
          page: args.page,
          per_page: args.per_page,
          total_pages: totalPages,
          total_items: totalItems,
          data: filteredEmployees.slice((args.page - 1) * args.per_page, args.page * args.per_page),
        };
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        input: { type: EmployeeInputType },
      },
      resolve(parent, args) {
        // Create a new employee with the input data
        const newEmployee = {
          id: (mockEmployees.length + 1).toString(),
          ...args.input,
        };

        // Add the new employee to the mock data source (replace with your own data storage logic)
        mockEmployees.push(newEmployee);

        console.log({ mockEmployees });
        return newEmployee;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
