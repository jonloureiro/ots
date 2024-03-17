import { PreserveSecret } from "@/secret-application/service/preserve-secret";
import { RevealSecret } from "@/secret-application/service/reveal-secret";
import type { FactoryProvider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { SecretRepository } from "../typeorm/secret-repository.js";
import { SecretRepositoryInterface } from "@/secret-application-port/repository/secret-repository-interface";
import { PreserveSecretInterface } from "@/secret-application-port/service/preserve-secret-interface";
import { RevealSecretInterface } from "@/secret-application-port/service/reveal-secret-interface";

export const SecretRepositoryProvider: FactoryProvider = {
  provide: SecretRepositoryInterface,
  useFactory: (dataSource: DataSource) => new SecretRepository(dataSource),
  inject: [DataSource],
};

export const PreserveSecretUsecaseProvider: FactoryProvider = {
  provide: PreserveSecretInterface,
  useFactory: (secretRepository: SecretRepository) => new PreserveSecret({ secretRepository }),
  inject: [SecretRepositoryInterface],
};

export const RevealSecretUsecaseProvide: FactoryProvider = {
  provide: RevealSecretInterface,
  useFactory: (secretRepository: SecretRepository) => new RevealSecret({ secretRepository }),
  inject: [SecretRepositoryInterface],
};
