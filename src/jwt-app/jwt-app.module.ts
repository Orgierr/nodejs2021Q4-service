import { Global, Module } from '@nestjs/common';
import { config } from 'src/common/config';
import { JwtModule } from '@nestjs/jwt';
@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
    }),
  ],
  exports: [JwtModule],
})
export class JwtAppModule {}
