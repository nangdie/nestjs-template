import { GqlModuleOptions } from "@nestjs/graphql"
import { ValidationError } from 'apollo-server-express'
import { join } from "path"

const graphQl: GqlModuleOptions = {
    installSubscriptionHandlers: true,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    typePaths: ['./**/*.gql'],
    context: ({ req }) => ({ req }),
    formatError(error: ValidationError) {
        const {
            message,
            extensions: { code },
        } = error
        return {
            code,
            message,
            timestamp: new Date(),
        }
    },
}

export default graphQl