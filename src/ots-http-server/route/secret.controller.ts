import type { PreserveSecretInterface } from "@/secret-application-port/service/preserve-secret-interface";
import type { RevealSecretInterface } from "@/secret-application-port/service/reveal-secret-interface";
import { Body, Controller, Get, HttpCode, Inject, Param, Post } from "@nestjs/common";

@Controller("secret")
export class SecretController {
  readonly #preserveSecretUsecase: PreserveSecretInterface;
  readonly #revealSecretUsecase: RevealSecretInterface;

  constructor(preserveSecretUsecase: PreserveSecretInterface, revealSecretUsecase: RevealSecretInterface) {
    this.#preserveSecretUsecase = preserveSecretUsecase;
    this.#revealSecretUsecase = revealSecretUsecase;
  }

  @Get()
  hello(): string {
    return "Hello, World!";
  }

  @Post()
  @HttpCode(204)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async preserveSecret(@Body() input: any): Promise<void> {
    const expirationDate =
      input.expiration_date !== null && input.expiration_date !== undefined
        ? new Date(input.expiration_date)
        : undefined;
    await this.#preserveSecretUsecase.execute({
      id: input.id,
      secret: input.secret,
      email: input.email,
      emailDomain: input.email_domain,
      expirationDate: expirationDate,
    });
  }

  @Post(":id/reveal")
  @HttpCode(200)
  async revealSecret(@Param("id") id: string): Promise<void> {
    this.#revealSecretUsecase.execute({ id: id });
  }
}
