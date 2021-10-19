import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("brand", { schema: "shopping" })
export class Brand {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "logoPath", nullable: true, length: 255 })
  logoPath: string | null;

  @Column("tinytext", { name: "origin", nullable: true })
  origin: string | null;

  @Column("varchar", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("tinyint", { name: "isForeign", nullable: true, width: 1 })
  isForeign: boolean | null;

  @Column("varchar", { name: "providerId", nullable: true, length: 255 })
  providerId: string | null;

  @Column("timestamp", {
    name: "createdAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
