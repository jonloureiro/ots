import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SecretOrm } from "./secret-orm.js";

@Entity("emails")
export class EmailOrm {
  @PrimaryGeneratedColumn("identity", {
    type: "bigint",
    generatedIdentity: "ALWAYS",
    primaryKeyConstraintName: "emails_pkey",
  })
  id!: number;

  @ManyToOne(() => SecretOrm, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    nullable: false,
  })
  @JoinColumn({
    name: "secret_id",
    foreignKeyConstraintName: "emails_secret_id_fkey",
  })
  secret!: SecretOrm;

  @Column({ type: "varchar", length: 255 })
  email!: string;
}
