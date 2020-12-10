import { GqlModuleOptions } from "@nestjs/graphql"

const graphQl: GqlModuleOptions = {
    typePaths: ['./**/*.graphql'],
    installSubscriptionHandlers: true
}

export default graphQl