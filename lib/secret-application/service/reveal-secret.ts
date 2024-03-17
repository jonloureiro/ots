import type { Secret } from "@/secret-domain/entity/secret";
import { SecretId } from "@/secret-domain/value-object/secret-id";
import type { SecretRepositoryFindMethod } from "@/secret-application-port/repository/secret-repository-interface";
import {
  type RevealSecretInput,
  type RevealSecretInterface,
  RevealSecretOutput,
} from "@/secret-application-port/service/reveal-secret-interface";
import { SecretMapper } from "../mapper/secret-mapper.js";

interface SecretRepositoryInterface extends SecretRepositoryFindMethod {}

type RevealSecretDeps = {
  secretRepository: SecretRepositoryInterface;
};

// TODO: review this use case
export class RevealSecret implements RevealSecretInterface {
  readonly #secretMapper;
  readonly #secretRepository;

  constructor(deps: RevealSecretDeps) {
    this.#secretRepository = deps.secretRepository;
    this.#secretMapper = new SecretMapper();
  }

  /**
   * @throws {Error} if parsed input is invalid
   */
  async execute(input: RevealSecretInput): Promise<RevealSecretOutput> {
    let secretId: SecretId;
    try {
      secretId = new SecretId(input.id);
    } catch (error) {
      throw this.handleError(error);
    }

    const secretDTO = await this.#secretRepository.find(secretId.value);
    if (!secretDTO) throw this.handleError(new Error("Secret not found"));

    let secretEntity: Secret;
    try {
      secretEntity = this.#secretMapper.toEntity(secretDTO);
    } catch (error) {
      throw this.handleError(error);
    }

    console.log(secretEntity.secret);
    return new RevealSecretOutput(secretEntity.secret);
  }

  private handleError(error: unknown): unknown {
    // TODO: use a better error handling mechanism
    return error;
  }
}
