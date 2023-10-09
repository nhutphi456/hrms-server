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
const { mockEmployees } = require("./data/mockEmployee");
const { mockEmployee, positions, departments, mockSum } = require("./data/newMockEmployee");
const {
  Employee,
  EmployeeType,
  EmployeeList,
  EmployeeInputType,
  EmployeeUpdateInputType,
} = require("./type");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

async function saveImage(base64Data, targetPath) {
  console.log({ base64Data });
  const data = base64Data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(data, "base64");
  await fs.writeFileSync(targetPath, buffer);
}

// Define a function to generate a unique filename (you can use your own logic)
function generateUniqueFilename(id) {
  return `profile-avatar-${id}`;
}
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    employee: {
      type: Employee,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const employeeId = args.id;
        return mockEmployee.find((employee) => employee.id === employeeId);
      },
    },
    employees: {
      type: EmployeeList,
      args: {
        status: { type: GraphQLInt, defaultValue: null },
        departments: { type: new GraphQLList(GraphQLInt), defaultValue: [] },
        currentContracts: { type: new GraphQLList(GraphQLInt), defaultValue: [] },
        pageNo: { type: GraphQLInt, defaultValue: 1 },
        pageSize: { type: GraphQLInt, defaultValue: 10 },
      },
      resolve(parent, args) {
        // if (!Object.values(args).some((arg) => arg !== undefined && arg !== null)) {
        //   return {
        //     page: args.page,
        //     per_page: args.per_page,
        //     total_pages: 1,
        //     total_items: mockEmployee.length,
        //     data: mockEmployee,
        //   };
        // }

        let filteredEmployees = mockEmployee;

        if (args.status !== undefined && args.status !== null) {
          filteredEmployees = filteredEmployees.filter(
            (employee) => employee.status === args.status
          );
        }

        if (Array.isArray(args.departments) && args.departments.length > 0) {
          filteredEmployees = filteredEmployees.filter((employee) =>
            args.departments.includes(employee.department.id)
          );
        }
        if (Array.isArray(args.currentContracts) && args.currentContracts.length > 0) {
          filteredEmployees = filteredEmployees.filter((employee) =>
            args.currentContracts.includes(employee.currentContract)
          );
        }

        // if (args.currentContracts !== undefined && args.currentContracts !== "") {
        //   filteredEmployees = filteredEmployees.filter((employee) =>
        //     args.currentContracts.includes(employee.currentContract)
        //   );
        // }

        const totalItems = filteredEmployees.length;
        const totalPages = Math.ceil(totalItems / args.pageSize);

        return {
          pagination: {
            pageNo: args.pageNo,
            pageSize: args.pageSize,
            totalPages: totalPages,
            totalItems: totalItems,
          },
          data: filteredEmployees.slice(
            (args.pageNo - 1) * args.pageSize,
            args.pageNo * args.pageSize
          ),
        };
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    addEmployee: {
      type: Employee,
      args: {
        input: { type: EmployeeInputType },
      },
      async resolve(parent, args) {
        // Create a new employee with the input data
        const { departmentId, positionLevelId, avatarImg } = args.input;
        const id = (mockEmployee.length + 1).toString();
        console.log({ avatarImg });
        // Generate a unique filename for the image
        const filename = `${generateUniqueFilename(id)}.png`;
        // Specify the target path where the image will be saved in the "assets" directory
        const targetPath = path.join(__dirname, "assets", filename);

        // Save the image to the target path
        await saveImage(avatarImg, targetPath);
        const newEmployee = {
          id,
          department: {
            id: departmentId,
            name: departments.find((dep) => dep.id === departmentId),
            sum: mockSum,
          },
          positionLevel: {
            id: positionLevelId,
            name: positions.find((pos) => pos.id === positionLevelId),
          },
          dateJoined: faker.date.past().toISOString(),
          profileBio: faker.lorem.paragraph(),
          ...args.input,
        };

        console.log({ newEmployee });
        delete newEmployee.positionLevelId;
        delete newEmployee.departmentId;

        // Add the new employee to the mock data source (replace with your own data storage logic)
        mockEmployee.push(newEmployee);

        console.log({ mockEmployee });
        return newEmployee;
      },
    },
    updateEmployee: {
      type: GraphQLString, // You can change the return type as needed
      args: {
        input: { type: EmployeeUpdateInputType },
      },
      resolve(parent, args) {
        // Extract the update data from args.input
        const {
          id,
          firstName,
          lastName,
          gender,
          dateOfBirth,
          phoneNumber,
          email,
          address,
          positionLevelId,
          profileBio,
          departmentId,
          avatarImg,
          twitterLink,
          facebookLink,
          instagramLink,
          linkedinLink,
          // Add other fields as needed
        } = args.input;

        // Find the employee by ID in your data source (e.g., database)
        const employeeToUpdate = mockEmployee.find((e) => e.id === id);

        if (!employeeToUpdate) {
          throw new Error("Employee not found");
        }

        // Update the employee's fields with the provided data
        employeeToUpdate.firstName = firstName;
        employeeToUpdate.lastName = lastName;
        employeeToUpdate.gender = gender;
        employeeToUpdate.dateOfBirth = dateOfBirth;
        employeeToUpdate.phoneNumber = phoneNumber;
        employeeToUpdate.email = email;
        employeeToUpdate.address = address;
        // employeeToUpdate.positionLevelId = positionLevelId;
        employeeToUpdate.profileBio = profileBio;
        employeeToUpdate.avatarImg = avatarImg;
        employeeToUpdate.facebookLink = facebookLink;
        employeeToUpdate.twitterLink = twitterLink;
        employeeToUpdate.instagramLink = instagramLink;
        employeeToUpdate.linkedinLink = linkedinLink;
        return "Employee updated successfully";
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
