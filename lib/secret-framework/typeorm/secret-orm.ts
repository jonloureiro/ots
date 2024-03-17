import { SecretDto } from "@/secret-application-port/dto/secret-dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { EmailDomainOrm } from "./email-domain-orm.js";
import { EmailOrm } from "./email-orm.js";

@Entity("secrets")
export class SecretOrm {
  @PrimaryGeneratedColumn("identity", {
    type: "bigint",
    generatedIdentity: "ALWAYS",
    primaryKeyConstraintName: "secrets_pkey",
  })
  id!: number;

  @Column({ type: "char", length: 16 })
  @Unique("secrets_public_id_key", ["public_id"])
  public_id!: string;

  @Column({ type: "varchar", length: 1048576 })
  secret!: string;

  @Column({ type: "char", length: 64, nullable: true })
  code_hash?: string;

  @Column({ type: "smallint" })
  remaining_attempts!: number;

  @Column({ type: "timestamp with time zone" })
  expires_at!: Date;

  @OneToMany(
    () => EmailOrm,
    (email) => email.secret,
    {
      cascade: true,
      eager: true,
    },
  )
  emails!: EmailOrm[];

  @OneToMany(
    () => EmailDomainOrm,
    (emailDomain) => emailDomain.secret,
    {
      cascade: true,
      eager: true,
    },
  )
  email_domains!: EmailDomainOrm[];

  static fromDto(dto: SecretDto): SecretOrm {
    const secretModel = new SecretOrm();
    secretModel.public_id = dto.id;
    secretModel.secret = dto.secret;
    secretModel.remaining_attempts = dto.remainingAttempts;
    secretModel.expires_at = dto.expirationDate;
    if (typeof dto.email === "string") {
      const emailModel = new EmailOrm();
      emailModel.email = dto.email;
      emailModel.secret = secretModel;
      secretModel.emails = [emailModel];
    }
    if (typeof dto.emailDomain === "string") {
      const emailDomainModel = new EmailDomainOrm();
      emailDomainModel.email_domain = dto.emailDomain;
      emailDomainModel.secret = secretModel;
      secretModel.email_domains = [emailDomainModel];
    }
    return secretModel;
  }

  toDto(): SecretDto {
    // if (this.emails.length > 0) secretDto.email = this.emails[0].email;
    // if (this.email_domains.length > 0)
    //   secretDto.emailDomain = this.email_domains[0].email_domain;
    const secretDto = new SecretDto(this.public_id, this.secret, this.remaining_attempts, this.expires_at);
    return secretDto;
  }
}
