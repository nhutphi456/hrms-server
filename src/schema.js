const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const { employees } = require("./data/employees");

const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    gender: { type: GraphQLInt },
    dob: { type: GraphQLString },
    position: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    address: { type: GraphQLString },
    status: { type: GraphQLInt },
    reportTo: { type: GraphQLInt },
    department: { type: GraphQLString },
    currentContract: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    employees: {
      type: new GraphQLList(EmployeeType),
      args: {
        status: { type: GraphQLInt, defaultValue: null },
        departments: { type: GraphQLString, defaultValue: null },
      },
      resolve(parent, args) {
        if (!Object.values(args).some((arg) => arg !== undefined && arg !== null)) {
          return employees;
        }
        return employees.filter((employee) => {
          // return (
          //   (args.status === undefined || employee.status === args.status) &&
          //   (args.departments === undefined ||
          //     args.departments?.split(",").includes(employee.department))
          // );
          return args.status === undefined || employee.status === args.status;
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
