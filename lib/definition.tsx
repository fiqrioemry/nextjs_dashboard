export interface menuType {
  name: string;
  path: string;
}

export interface User {
  id: number;
  role_id: number;
  name: string;
  email: string;
  password: string;
}

export interface Role {
  id: number;
  role_name: string;
}
export interface Category {
  id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
}

export interface Item {
  id: number;
  category_id: number;
  item_name: string;
  item_stock: number;
  item_cost: number;
  item_price: number;
  category_name: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface Sale {
  id: number;
  user_id: number;
  customer_id: number;
  total_amount: number;
  payment_type: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

interface SalesItem {
  id: number;
  sales_id: number;
  item_id: number;
  item_price: number;
  item_amount: number;
  created_at: string;
  updated_at: string;
}
