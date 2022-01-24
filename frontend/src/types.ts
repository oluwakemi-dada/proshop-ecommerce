export interface ProductTypes {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface CartItemTypes {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

// REDUX
export interface AppState {
  productList: {
    products: ProductTypes[];
  };
  productDetails: {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    reviews: [];
  };
  cart: {
    cartItems: CartItemTypes[];
  };
}

export interface ProductListState {
  productList: {
    products: ProductTypes[];
    loading: boolean;
    error?: any;
  };
}

export interface ProductDetailsState {
  productDetails: {
    product: ProductTypes;
    loading: boolean;
    error?: any;
  };
}

export interface ReduxAction {
  type: string;
  payload?: any;
}

export type ReduxDispatch = (data: ReduxAction) => void;
