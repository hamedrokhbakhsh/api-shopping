import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("shop_state", { schema: "shopping" })
export class ShopState {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;
}
