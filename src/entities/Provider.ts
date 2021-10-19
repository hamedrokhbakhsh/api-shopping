import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Shop } from "./Shop";

@Entity("provider", { schema: "shopping" })
export class Provider {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @ManyToMany(() => Shop, (shop) => shop.providers)
  @JoinTable({
    name: "product_providers",
    joinColumns: [{ name: "product_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "shop_id", referencedColumnName: "id" }],
    schema: "shopping",
  })
  shops: Shop[];
}
