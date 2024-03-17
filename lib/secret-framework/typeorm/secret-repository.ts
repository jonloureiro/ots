import type { SecretRepositoryInterface } from "@/secret-application-port/repository/secret-repository-interface";
import type { SecretDto } from "@/secret-application-port/dto/secret-dto";
import type { DataSource, Repository } from "typeorm";
import { SecretOrm } from "./secret-orm.js";

export class SecretRepository implements SecretRepositoryInterface {
  readonly #dataSource: DataSource;
  readonly #secretRepository: Repository<SecretOrm>;

  constructor(readonly dataSource: DataSource) {
    this.#dataSource = dataSource;
    this.#secretRepository = this.#dataSource.getRepository(SecretOrm);
  }

  async save(secret: SecretDto): Promise<void> {
    const secretModel = SecretOrm.fromDto(secret);
    await this.#secretRepository.save<SecretOrm>(secretModel);
  }

  async find(id: string): Promise<SecretDto | null> {
    const secretModel = await this.#secretRepository.findOne({
      where: { public_id: id },
    });
    if (!secretModel) return null;
    return secretModel.toDto();
  }
}
