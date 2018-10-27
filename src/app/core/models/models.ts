import { Timestamp } from "rxjs";
import { Time } from "@angular/common";

export interface Address {
  addressID?: String;
  userID?: String;
  user_name?: String;
  delivery_address?: String;
  delivery_area?: String;
  delivery_phone?: String;
}

export interface Area {
  areaID: String;
  area_code: String;
  area_name: String;
  status: Boolean;
}

export interface Cart {
  cartID: String;
  createdAT?: Time;
  items: Array<Item>;
}

export interface Category {
  categoryID?: String;
  categoryTags?: Array<String>;
  categoryTitle?: String;
}

export interface CartProduct {
  product: Product;
  quantity: number;
}

export interface Item {
  product: Product;
  quentity: number;
}

export interface Order {
  orderID?: string;
  userID?: String;
  createdAt?: Timestamp<Time>;
  orderNo?: String;
  phoneNo?: String;
  cart?: Cart;
  orderValue?: Number;
  orderItems?: Number;
  order_address?: Address;
  order_date?: string;
  order_area?: String;
  order_time?: String;
  order_instruction?: String;
  order_status?: String;
  order_discount?: Number;
  paymentID?: String;
  paymentMethod?: String;
  paymentStatus?: Boolean;
  riderID?: String;
  status?: Boolean;
}

export interface Payment {
  paymentID?: String;
  paymentCurrency?: String;
  paymentType?: String;
  transectionID?: String;
  transectionPhone?: String;
  transectionStatus?: Boolean;
}


export interface Product {
  productID: string;
  product_name: string;
  product_description: string;
  product_image_url: string;
  product_unit_name: string;
  product_unit_amount: string;
  product_price: number;
  product_price_retail: number;
  product_category: string;
  product_sub_category: string;
  product_stock: number;
  product_max_cart: string;
  product_supplier: string;
  product_vendor: string;
  product_sku: string;
  product_status: string;
  product_tags: Array<String>;
}

export interface TimeSlot {
  title: String;
  value: String;
  status: Boolean;
}



export interface Rider {
  riderID: String;
  status: Boolean;
}

export interface Supplier {
  supplierID: String;
  supplier_name: String;
}

export interface ActiveUser {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  fid?: string;
  providerId?: string;
  isAdmin?: boolean;
  profileType?: string;
  profileLabel?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  gender?: string;
  birthDate?: string;
  age?: string;
  address?: string;
  languages?: string;
  company?: string;
  agency?: string;
  experiences?: string;
  union?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  mainProfession?: string;
  mainProfessionUnion?: string;
  mainProfessionCoverText?: string;
  coverPhotoUrl?: string;
  profilePhotoUrl?: string;
}
