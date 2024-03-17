import { Secret } from "@/secret-domain/entity/secret";
import type { SecretRepositorySaveMethod } from "@/secret-application-port/repository/secret-repository-interface";
import {
  PreserveSecretInput,
  type PreserveSecretInterface,
} from "@/secret-application-port/service/preserve-secret-interface";
import { SecretMapper } from "../mapper/secret-mapper.js";

interface SecretRepositoryInterface extends SecretRepositorySaveMethod {}

type PreserveSecretDeps = {
  secretRepository: SecretRepositoryInterface;
};

export class PreserveSecret implements PreserveSecretInterface {
  readonly #secretMapper;
  readonly #secretRepository;

  constructor(deps: PreserveSecretDeps) {
    this.#secretRepository = deps.secretRepository;
    this.#secretMapper = new SecretMapper();
  }

  /**
   * @throws {Error} if parsed input is invalid
   */
  async execute(input: PreserveSecretInput): Promise<void> {
    if (!(input instanceof PreserveSecretInput)) throw new Error("Invalid preserve secret input");
    let secret: Secret;
    try {
      secret = new Secret(input);
    } catch (error) {
      throw this.handleError(error);
    }
    await this.#secretRepository.save(this.#secretMapper.toDto(secret));
  }

  private handleError(error: unknown): unknown {
    // TODO: use a better error handling mechanism
    return error;
  }
}
