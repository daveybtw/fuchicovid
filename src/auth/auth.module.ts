import { Module } from '@nestjs/common';
import { RegistrantesModule } from 'src/registrantes/registrantes.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [RegistrantesModule, PassportModule],
  providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule {}
