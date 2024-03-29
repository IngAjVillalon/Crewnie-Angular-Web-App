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



export interface portfolioItem {
  portfolioId?: string;
  portfolioUserId?: string;
  portfolioType: string;
  portfolioThumb: string;
  portfolioFile: string;
  portfolioItemTitle: string;
  portfolioItemDescription: string;
  portfolioItemLocation: string;
  portfolioItemDate: firebase.firestore.Timestamp;
  portfolioItemCategories: Array<string>;
  portfolioItemQuality: boolean;
  portfolioItemViews: number;
  portfolioItemComments: number;
  portfolioItemFavs: number;
}


export interface commentItem {
  commentId?: string;
  commentDate?: firebase.firestore.Timestamp;
  commentText?: string;
  commentUserId?: string;
  commentUserName?: string;
  commentLike?: number;
}

export interface projectItem {
  projectId?: string;
  createdAt?: firebase.firestore.Timestamp;
  modifiedAt?: firebase.firestore.Timestamp;
  projectText?: string;
  projectUserId?: string;
  projectUserName?: string;
  projectLike?: number;
}

export interface userGroupUser {
  user: ActiveUser;
  userPosition?: string;
  userRole?: string;
}

export interface userGroup {
  createdAt?: firebase.firestore.Timestamp;
  modifiedAt?: firebase.firestore.Timestamp;
  groupId?: string;
  groupTitle?: string;
  groupUsers?: Array<userGroupUser>;
}

export interface teamMember {
  name?: string;
  position?: string;
  role?: string;
  user?: ActiveUser;
}

export interface groupData {
  groupId?: string;
  groupTitle?: string;
  teamLeader?: teamMember;
  members?: Array<teamMember>;
}

// Depertments

export interface depertmentObject {
  depertment?: depertment;
  teamLeader?: member;
  members?: Array<member>;
}

export interface depertments {
  groupId?: string;
  groupTitle?: string;
  teamLeader?: member;
  members?: Array<member>;
}

export interface depertment {
  depertmentId?: string;
  title?: string;
  teamLeader?: string;
  members?: Array<string>;
}

export interface member {
  memberId?: string;
  name?: string;
  profilePhoto?: string;
  position?: string;
  role?: string;
  userId?: string;
  user?: ActiveUser;
}

export interface responsibles {
  id?: string;
  name?: string;
  profilePhoto?: string;
  position?: string;
  role?: string;
  userId?: string;
  user?: ActiveUser;
}

// export interface depertments {
//   id?: string;
//   name?: string;
//   profilePhoto?: string;
//   position?: string;
//   role?: string;
//   userId?: string;
//   user?: ActiveUser;
// }


// MongoDB Data Models

export interface Project {
  _id?: string;
  creatorId?: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;

  private?: boolean;
  title?: string;
  location?: string;
  type?: string;
  agency?: string;
  coverPhoto?: string;

  categories?: Array<string>;
  genras?: Array<string>;

  hasUnion?: boolean;
  unions?: Array<string>;

  startDate?: Date | string;
  endDate?: Date | string;

  departments?: Array<Department>;
}


export interface DepartmentUser {
  name?: string;
  profilePhoto?: string;
  role?: string;
  position?: string;
  userId?: string;
  // user?: ActiveUser;
}

export interface Department {

  title?: string;
  projectId?: string;

  teamLeader?: DepartmentUser;
  members?: DepartmentUser[];

}

export interface Position {

  projectId?: string;
  departmentId?: string;
  departmentState?: string;
  index?: number;
  title?: string;
  location?: string;
  salary?: string;
  salaryMin?: number;
  salaryMax?: number;
  duration?: string;
  vacancy?: number;
  selected?: number;
  selectedMembers?: Array<Object>;
  startDate?: Date | string;
  endDate?: Date | string;

}



