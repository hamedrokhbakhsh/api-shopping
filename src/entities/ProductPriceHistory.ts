import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Index("product_id", ["productId"], {})
@Entity("product_price_history", { schema: "shopping" })
export class ProductPriceHistory {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @Column("int", { name: "price" })
  price: number;

  @Column("timestamp", { name: "date", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @ManyToOne(() => Product, (product) => product.productPriceHistories, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;
}
