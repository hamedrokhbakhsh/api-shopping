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
import { Product } from "./Product";
import { Shop } from "./Shop";

@Index("category_ibfk_1", ["parentId"], {})
@Entity("category", { schema: "shopping" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("char", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "parentId", nullable: true, default: () => "'0'" })
  parentId: number | null;

  @Column("char", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @ManyToOne(() => Category, (category) => category.categories, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "parentId", referencedColumnName: "id" }])
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  categories: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToMany(() => Shop, (shop) => shop.categories)
  shops: Shop[];
}
