const Prisma = require('@prisma/client');

const prisma = new Prisma.PrismaClient();

const create = async () => {
  const users = [
    { name: 'John', surname: 'Smith' },
    { name: 'Jane', surname: 'bitter' },
  ];
  const newUser = await prisma.user.createMany({
    data: users,
  });

  return newUser;
};

const findUsers = async () => {
  const users = await prisma.user.findUnique({
    where: {
      id: 'clcpdb30j000ia06i0rpcg0ya1',
    },
  });

  return users;
};

const updateUser = async () => {
  const updatedUser = await prisma.user.update({
    where: {
      id: 'clcpdb30j000ia06i0rpcg0ya',
    },
    data: {
      name: 'Jame is Updated',
    },
  });
};

const deleteUser = async () => {
  const deletedUsers = prisma.user.deleteMany({
    where: {
      surname: {
        startsWith: 'Doe',
      },
    },
  });

  return deletedUsers;
};

deleteUser().then((res) => console.log(res));
