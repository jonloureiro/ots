import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SecretOrm } from "./secret-orm.js";

@Entity("email_domains")
export class EmailDomainOrm {
  @PrimaryGeneratedColumn("identity", {
    type: "bigint",
    generatedIdentity: "ALWAYS",
    primaryKeyConstraintName: "email_domains_pkey",
  })
  id!: number;

  @ManyToOne(() => SecretOrm, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    nullable: false,
  })
  @JoinColumn({
    name: "secret_id",
    foreignKeyConstraintName: "email_domains_secret_id_fkey",
  })
  secret!: SecretOrm;

  @Column({ type: "varchar", length: 255 })
  email_domain!: string;
}
