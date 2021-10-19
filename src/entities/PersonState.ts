import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person";

@Entity("person_state", { schema: "shopping" })
export class PersonState {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @OneToMany(() => Person, (person) => person.state2)
  people: Person[];
}
