import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailDomainOrm } from "../typeorm/email-domain-orm.js";
import { EmailOrm } from "../typeorm/email-orm.js";
import { SecretOrm } from "../typeorm/secret-orm.js";
import {
  PreserveSecretUsecaseProvider,
  RevealSecretUsecaseProvide,
  SecretRepositoryProvider,
} from "./secret.provider.js";

@Module({
  imports: [TypeOrmModule.forFeature([SecretOrm, EmailOrm, EmailDomainOrm])],
  providers: [SecretRepositoryProvider, PreserveSecretUsecaseProvider, RevealSecretUsecaseProvide],
  exports: [PreserveSecretUsecaseProvider, RevealSecretUsecaseProvide],
})
export class SecretModule {}
