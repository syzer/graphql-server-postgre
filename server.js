import config from './config'
import Express from 'express'
import GraphHTTP from 'express-graphql'
import GraphQLSchema from './relay-model'

// Start
const app = Express()

// GraphQL
app.use('/graphql', GraphHTTP({
    schema: GraphQLSchema,
    pretty: true,
    graphiql: true
}))

app.listen(config.app.port, () => {
    console.log(`App listening on port ${config.app.port}`)
})
