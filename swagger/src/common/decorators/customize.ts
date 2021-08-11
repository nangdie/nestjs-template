import { SetMetadata } from '@nestjs/common'

export const NoAuth = () => SetMetadata('no-auth', true);