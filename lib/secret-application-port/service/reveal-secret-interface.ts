import { isString } from "@/common-application-layer/type-is";

export class RevealSecretInput {
  /**
   * @throws {AggregateError} if the input is invalid
   */
  constructor(readonly id: string) {
    if (isString(id)) throw new AggregateError([new Error("Id must be a string")], "Reveal secret input is invalid");
  }
}

export class RevealSecretOutput {
  /**
   * @throws {AggregateError} if the output is invalid
   */
  constructor(readonly secret: string) {
    if (isString(secret))
      throw new AggregateError([new Error("Secret must be a string")], "Reveal secret output is invalid");
  }
}

export abstract class RevealSecretInterface {
  abstract execute(input: RevealSecretInput): Promise<RevealSecretOutput>;
}
