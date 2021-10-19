import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person";

@Entity("person_status", { schema: "shopping" })
export class PersonStatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @OneToMany(() => Person, (person) => person.status2)
  people: Person[];
}
