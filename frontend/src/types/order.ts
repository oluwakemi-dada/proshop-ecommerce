import { Cart, ShippingAddress } from './index';

export interface Order {
	orderItems: Cart[];
	shippingAddress: ShippingAddress;
	paymentMethod: string;
	itemsPrice: number;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
}