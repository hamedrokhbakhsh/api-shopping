import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Person } from "./Person";
import { Shop } from "./Shop";

@Index("person_id", ["personId"], {})
@Index("person_history_ibfk_2", ["shopId"], {})
@Entity("person_history", { schema: "shopping" })
export class PersonHistory {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "person_id" })
  personId: number;

  @Column("int", { name: "shop_id" })
  shopId: number;

  @Column("timestamp", {
    name: "start_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  startDate: Date;

  @Column("timestamp", { name: "end_date", default: () => "CURRENT_TIMESTAMP" })
  endDate: Date;

  @ManyToOne(() => Person, (person) => person.personHistories, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "person_id", referencedColumnName: "id" }])
  person: Person;

  @ManyToOne(() => Shop, (shop) => shop.personHistories, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "shop_id", referencedColumnName: "id" }])
  shop: Shop;
}
