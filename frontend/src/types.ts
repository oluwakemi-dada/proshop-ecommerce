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

// REDUX
export interface ProductListState {
  productList: {
    products: ProductTypes[];
    loading: boolean;
    error: any;
  };
}

export interface ProductDetailsState {
  productDetails: {
    product: ProductTypes;
    loading: boolean;
    error: any;
  };
}

export interface ReduxAction {
  type: string;
  payload?: any;
}

export type ReduxDispatch = (data: ReduxAction) => void;
