import faker from 'faker'

module.exports = function repositoryFixture(_, faker) {

    return {
        maybeSeedDb
    }

    function maybeSeedDb(models) {
        //TODO count
        _.times(5, () => seed(models))
    }

    function seed(models) {
        let {article, author} = models
        console.log('bazinga', models, article)

        return author.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email()
        }).then(author => {
            console.log(author)
            return author.createArticle({
                abstract: `${faker.company.bs()}`,
                title: `Sample article by ${author.firstName}`,
                content: `here is some content ${faker.company.bs()}`
            })
        })
    }
}
