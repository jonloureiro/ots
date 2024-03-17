import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { SecretController } from "./secret.controller.js";
import { PreserveSecretInterface } from "@/secret-application-port/service/preserve-secret-interface";

describe("SecretController", () => {
  let controller: SecretController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretController],
      providers: [
        {
          provide: PreserveSecretInterface,
          useValue: {
            execute: () => Promise.resolve(""),
          },
        },
      ],
    }).compile();

    controller = module.get<SecretController>(SecretController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
