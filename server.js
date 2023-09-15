const express = require('express')
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config()
const connectionString = process.env.MONGO_DB; 
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    
    GraphQLNonNull
} = require("graphql")

const mongoose = require('mongoose')

require('./models/Lesson')
require('./models/TakenLesson')
require('./models/Student')
require('./models/Parent')


const Lesson = mongoose.model('Lesson')
const TakenLesson = mongoose.model('TakenLesson')
const Student = mongoose.model('Student')
const Parent = mongoose.model('Parent')

function handleError(err){
    console.log(err);
  }
  
  
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch(error => handleError(error));
  
   mongoose.connection.on('error', err => {
    handleError(err);
  });
  


const ParentType = new GraphQLObjectType(
    {
        name: "parent",
        description: "parents",
        fields: () =>
        ({
            _id: {type: new GraphQLNonNull(GraphQLString)},
            firstName: {type: new GraphQLNonNull(GraphQLString)},
            lastName: {type: new GraphQLNonNull(GraphQLString)},
            children: {
                type: new GraphQLList(StudentType),
                resolve: async (parent) => await Student.find({parent: parent._id})
            }
        })
    })


const StudentType = new GraphQLObjectType(
    {
        name: "student",
        description: "students",
        fields: () =>
        ({
            _id: {type: new GraphQLNonNull(GraphQLString)},
            firstName: {type: new GraphQLNonNull(GraphQLString)},
            lessons: 
            {
                type: new GraphQLList(LessonType),
                resolve: async (student) => await Lesson.find({student: student._id})
            }
        })
    })

const LessonType = new GraphQLObjectType(
    {
        name: "lesson",
        description: "lessons",
        fields: () =>
        ({
            _id: {type: new GraphQLNonNull(GraphQLString)},
            rateKey: {type: GraphQLString}
        })
    })



const MSLCRootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        parents: 
        {
            type: new GraphQLList(ParentType),
            description: "List of Books",
            args:
            {
                _id: {type: GraphQLString}
            },
            resolve: async (parent, args) => args._id? await Parent.find({_id: args._id}) : await Parent.find({})
        }
    })
})


    const MSLCRootMutationType = new GraphQLObjectType(
        {
            name: 'Mutation',
            description: 'Root Mutation',
            fields: () =>({
                addParent:
                {
                    type: ParentType,
                    description: 'adding a parent',
                    args: {
                        firstName:{type: new GraphQLNonNull(GraphQLString)},
                        lastName:{type: new GraphQLNonNull(GraphQLString)},
                        email:{type: new GraphQLNonNull(GraphQLString)}
                    },
                    resolve: (parent, args) => 
                    {
                        var obj = 
                        {
                            firstName: args.firstName,
                            lastName: args.lastName,
                            email: args.email,
                            createdDate: (new Date())
                        }
                        var parent = new Parent(obj)
    
                        parent.save();
                        return parent;
                    }
    
                }
            })
        })


const schema = new  GraphQLSchema({
    query: MSLCRootQueryType,
    mutation: MSLCRootMutationType
})


const app = express()
const port = 5000

app.use('/graphql',  graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})