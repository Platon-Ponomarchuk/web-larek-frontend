import { IProduct } from '../../../types';

export class Cart {
	protected totalPrice: number;
	protected products: IProduct[];
	protected counter: number;

	constructor() {
		this.products = [];
		this.totalPrice = 0;
		this.counter = 0;
	}

	get Products() {
		return this.products;
	}

	get TotalPrice() {
		return this.totalPrice;
	}

	get Counter() {
		return this.counter;
	}

	addProduct(product: IProduct) {
		this.products.push(product);
		this.totalPrice += product.price;
		this.counter++;
	}

	removeProduct(index: number) {
		this.totalPrice -= this.products[index].price;
		this.products.splice(index, 1);
		this.counter--;
	}

	clear() {
		this.products = [];
		this.totalPrice = 0;
		this.counter = 0;
	}
}
