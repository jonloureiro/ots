import { SecretModule } from "@/secret-framework/module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SecretController } from "../route/secret.controller.js";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      password: "postgres",
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    SecretModule,
  ],
  controllers: [SecretController],
})
export class AppModule {}
