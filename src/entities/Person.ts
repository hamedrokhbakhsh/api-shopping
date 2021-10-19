import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PersonState } from "./PersonState";
import { PersonStatus } from "./PersonStatus";
import { PersonHistory } from "./PersonHistory";
import { Shop } from "./Shop";

@Index("person_ibfk_1", ["status"], {})
@Index("FK_person_person_state", ["state"], {})
@Entity("person", { schema: "shopping" })
export class Person {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "mobileNumber", length: 255 })
  mobileNumber: string;

  @Column("int", { name: "status", nullable: true })
  status: number | null;

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

  @Column("varchar", { name: "avatarPath", nullable: true, length: 255 })
  avatarPath: string | null;

  @Column("int", { name: "state", nullable: true })
  state: number | null;

  @ManyToOne(() => PersonState, (personState) => personState.people, {
    onDelete: "SET NULL",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "state", referencedColumnName: "id" }])
  state2: PersonState;

  @ManyToOne(() => PersonStatus, (personStatus) => personStatus.people, {
    onDelete: "SET NULL",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "status", referencedColumnName: "id" }])
  status2: PersonStatus;

  @OneToMany(() => PersonHistory, (personHistory) => personHistory.person)
  personHistories: PersonHistory[];

  @ManyToMany(() => Shop, (shop) => shop.people)
  shops: Shop[];
}
