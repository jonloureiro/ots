import type { SecretDto } from "../dto/secret-dto.js";

export interface SecretRepositorySaveMethod {
  save(secret: SecretDto): Promise<void>;
}

export interface SecretRepositoryFindMethod {
  find(id: string): Promise<SecretDto | null>;
}

export abstract class SecretRepositoryInterface implements SecretRepositorySaveMethod, SecretRepositoryFindMethod {
  abstract save(secret: SecretDto): Promise<void>;

  abstract find(id: string): Promise<SecretDto | null>;
}
