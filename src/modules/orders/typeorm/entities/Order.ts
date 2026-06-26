import Customer from "@modules/customers/typeorm/entities/Customer";
import OrderProducts from "./OrderProducts";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("orders")
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;
  @OneToMany(()=> OrderProducts, orders_products => orders_products.order,{
    cascade: true,
  })
  orders_products: OrderProducts[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
