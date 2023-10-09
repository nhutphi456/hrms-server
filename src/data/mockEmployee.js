const { faker } = require("@faker-js/faker");

const generateMockData = () => {
  const mockData = [];

  const genders = ["MALE", "FEMALE"];
  const statusOptions = [null, 'Active', 'Inactive'];
  const departmentOptions = [null, 'HR', 'Engineering', 'Sales', 'Marketing'];
  const currentContractOptions = [null, 'Contract A', 'Contract B', 'Contract C'];

  for (let i = 1; i <= 40; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const gender = Math.random() < 0.5 ? "MALE" : "FEMALE"; // Randomly select from the genders array
    const dob = faker.date.between({ from: "1950-01-01", to: "2000-12-31" }).toLocaleDateString();
    const phone = "1523697546";
    const email = faker.internet.email();
    const address = faker.location.streetAddress();
    const reportTo = "Robert King";
    const manager = "Robert King";
    const position = faker.person.jobTitle();
    const skillsTags = ["HTML", "CSS", "JAVASCRIPT"]; // You can generate random skills if needed
    const avatarImg = faker.image.avatar();
    const joinedProjects = [
      {
        name: "SAG",
        workAs: position,
        skillTags: skillsTags,
        contributedHours: 40,
      },
      {
        name: "SAG",
        workAs: position,
        skillTags: skillsTags,
        contributedHours: 40,
      },
    ];
    const emergencyContacts = [
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: "0236598712",
      },
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: "0236598712",
      },
    ];
    const bio = faker.lorem.paragraph(3);
    const status = Math.random() < 0.5 ? 0 : 1; // Randomly select status
    const department = Math.random() <0.5 ? "Software Development" : "Design"; // Randomly select department
    const currentContract = Math.random() < 0.33 ? "Full-time" : Math.random() < 0.5 ? "Part-time" : "Internship";

    const employee = {
      id: `${i}`,
      firstName,
      lastName,
      gender,
      dob,
      phone,
      email,
      address,
      reportTo,
      manager,
      position,
      skillsTags,
      avatarImg,
      joinedProjects,
      emergencyContacts,
      bio,
      status,
      department,
      currentContract
    };

    mockData.push(employee);
  }

  return mockData;
};

const mockEmployees = generateMockData();

module.exports = { mockEmployees };
