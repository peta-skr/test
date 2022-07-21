const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { PrismaClient } = require("@prisma/client");

const { projects, clients } = require("../sampleDatea");

const prisma = new PrismaClient();

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const ThreadType = new GraphQLObjectType({
  name: "Thread",
  fields: () => ({
    id: { type: GraphQLID },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

const responseType = new GraphQLObjectType({
  name: "Response",
  fields: () => ({
    id: { type: GraphQLID },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    threadId: {
      type: ThreadType,
      resolve(parent, args) {
        return prisma.thread.findUnique({ where: { id: parent.threadId } });
      },
    },
    createdAt: { type: GraphQLString },
    text: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    uid: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//user,thread,response
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // projects: {
    //   type: new GraphQLList(ProjectType),
    //   resolve(parent, args) {
    //     return Project.find();
    //   },
    // },
    // project: {
    //   type: ProjectType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     return Project.findById(args.id);
    //   },
    // },

    //全ユーザーを取得
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return prisma.user.findMany();
      },
    },

    //一人のユーザーを取得
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return prisma.user.findMany();
        return prisma.user.findUnique({
          where: {
            id: Number(args.id),
          },
        });
      },
    },

    //get thread
    threads: {
      type: new GraphQLList(ThreadType),
      resolve(parent, args) {
        return prisma.thread.findMany();
      },
    },

    thread: {
      type: ThreadType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return prisma.thread.findUnique({
          where: {
            id: Number(args.id),
          },
        });
      },
    },

    responses: {
      type: new GraphQLList(responseType),
      args: { threadId: { type: GraphQLID } },
      resolve(parent, args) {
        return prisma.response.findMany({
          where: {
            threadId: Number(args.threadId),
          },
        });
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // addUser: {
    //   type: UserType,
    //   args: {
    //     name: { type: GraphQLNonNull(GraphQLString) },
    //     uid: { type: GraphQLNonNull(GraphQLString) },
    //   },
    //   resolve(parent, args) {
    //     const user = prisma.user.create({
    //       data: { name: args.name, uid: args.uid },
    //     });
    //     return user;
    //   },
    // },

    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        // uid: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = prisma.user.delete({
          where: {
            id: Number(args.id),
            // uid: args.uid,
          },
        });
        return user;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
