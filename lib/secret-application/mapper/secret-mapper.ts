import { SecretDto } from "@/secret-application-port/dto/secret-dto";
import { Secret } from "@/secret-domain/entity/secret";

export class SecretMapper {
  toDto(secret: Secret): SecretDto {
    return new SecretDto(
      secret.id.value,
      secret.secret,
      secret.remainingAttempts,
      secret.expirationDate.value,
      secret.email?.value,
      secret.emailDomain?.value,
    );
  }

  /**
   * @throws {INVALID_SECRET_DTO_ERROR} if the dto is invalid
   */
  toEntity(secretDto: SecretDto): Secret {
    if (!(secretDto instanceof SecretDto)) throw INVALID_SECRET_DTO_ERROR;
    return new Secret({
      id: secretDto.id,
      secret: secretDto.secret,
      email: secretDto.email,
      emailDomain: secretDto.emailDomain,
      remainingAttempts: secretDto.remainingAttempts,
      expirationDate: secretDto.expirationDate,
    });
  }
}

const INVALID_SECRET_DTO_ERROR = new Error("Invalid secret dto");
