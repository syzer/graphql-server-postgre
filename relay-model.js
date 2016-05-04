import Db from './model'
import repo from './repo'

import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} from 'graphql'

import {
    nodeDefinitions,
    fromGlobalId,
    globalIdField,
    connectionArgs,
    connectionDefinitions,
    connectionFromPromisedArray
} from 'graphql-relay'

const Article = new GraphQLObjectType({
    name: 'Article',
    description: 'Published article',
    fields () {
        return {
            title: {
                type: GraphQLString,
                resolve (article) {
                    return article.title
                }
            },
            content: {
                type: GraphQLString,
                resolve (article) {
                    return article.content
                }
            },
            abstract: {
                type: GraphQLString,
                resolve (article) {
                    return article.abstract
                }
            },
            author: {
                type: personType,
                resolve (article) {
                    return article.getAuthor()
                }
            }
        };
    }
});

const {nodeInterface, nodeField} = nodeDefinitions(
    globalId => {
        const {type, id} = fromGlobalId(globalId);

        console.log('type=', type);
        console.log('id=', id);

        if (type === 'Person') {
            return Db.models.person.findById(id);
        }
        return null;
    },
    obj => {
        return personType;
    }
);

const personType = new GraphQLObjectType({
    name: 'Person',
    description: 'This represents a Person',
    fields: () => {
        return {
            id: globalIdField('Person'),
            firstName: {
                type: GraphQLString,
                resolve (person) {
                    return person.firstName;
                }
            },
            lastName: {
                type: GraphQLString,
                resolve (person) {
                    return person.lastName;
                }
            },
            email: {
                type: GraphQLString,
                resolve (person) {
                    return person.email;
                }
            },
            articles: {
                type: new GraphQLList(Article),
                resolve (person) {
                    return person.getArticles();
                }
            }
        };
    },
    interfaces: [nodeInterface]
});

// Connections
const {connectionType: PersonConnection} = connectionDefinitions({
    name: 'Person',
    nodeType: personType
});

const query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        node: nodeField,
        peopleRelay: {
            type: PersonConnection,
            description: 'Person connection test',
            args: connectionArgs,
            resolve (root, args) {
                return connectionFromPromisedArray(Db.models.person.findAll(), args);
            }
        },
        person: {
            type: personType,
            resolve (root, args) {
                return Db.models.person.findOne({where: args});
            }
        },
        people: {
            type: new GraphQLList(personType),
            args: {
                id: {
                    type: GraphQLInt
                },
                email: {
                    type: GraphQLString
                }
            },
            resolve (root, args) {
                return Db.models.person.findAll({where: args})
            }
        }
    })
});

const mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'setters',
    fields () {
        return {
            addPerson: {
                type: personType,
                args: {
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve (source, args) {
                    return Db.models.person.create({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email.toLowerCase()
                    })
                }
            }
        };
    }
})

export default new GraphQLSchema({
    query,
    mutation
})
