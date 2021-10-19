import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PersonHistory } from "./PersonHistory";
import { Provider } from "./Provider";
import { Category } from "./Category";
import { Person } from "./Person";

@Entity("shop", { schema: "shopping" })
export class Shop {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("point", { name: "location", nullable: true })
  location: string | null;

  @Column("varchar", { name: "phoneNumber", length: 255 })
  phoneNumber: string;

  @Column("int", { name: "owner_id" })
  ownerId: number;

  @Column("varchar", { name: "mobileNumber", length: 255 })
  mobileNumber: string;

  @Column("int", { name: "state" })
  state: number;

  @OneToMany(() => PersonHistory, (personHistory) => personHistory.shop)
  personHistories: PersonHistory[];

  @ManyToMany(() => Provider, (provider) => provider.shops)
  providers: Provider[];

  @ManyToMany(() => Category, (category) => category.shops,{})
  @JoinTable({
    name: "shop_categories",
    joinColumns: [{ name: "shop_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "category_id", referencedColumnName: "id" }],
    schema: "shopping",
  })
  categories: Category[];

  @ManyToMany(() => Person, (person) => person.shops)
  @JoinTable({
    name: "shop_staffs",
    joinColumns: [{ name: "shop_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "person_id", referencedColumnName: "id" }],
    schema: "shopping",
  })
  people: Person[];
}
