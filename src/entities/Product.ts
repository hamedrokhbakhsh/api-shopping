import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Brand } from "./Brand";
import { ProductPriceHistory } from "./ProductPriceHistory";

@Index("category_id", ["categoryId"], {})
@Index("brand_id", ["brandId"], {})
@Entity("product", { schema: "shopping" })
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "category_id" })
  categoryId: number;

  @Column("int", { name: "brand_id" })
  brandId: number;

  @Column("int", { name: "price" })
  price: number;

  @Column("varchar", { name: "image", length: 255 })
  image: string;

  @Column("varchar", { name: "descrption", length: 255 })
  descrption: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "brand_id", referencedColumnName: "id" }])
  brand: Brand;

  @OneToMany(
    () => ProductPriceHistory,
    (productPriceHistory) => productPriceHistory.product
  )
  productPriceHistories: ProductPriceHistory[];
}
