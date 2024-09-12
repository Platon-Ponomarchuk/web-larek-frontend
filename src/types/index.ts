import { IEvents } from '../components/base/events';

export type ModalActions = {
	onClick: () => void;
};

export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	price: number;
	counter?: HTMLElement;
	deleteBtn?: HTMLElement;
}

export interface ICart {
	products: IProduct[];
	totalPrice: number;
	counter: number;
	addProduct: (product: IProduct) => void;
	removeProduct: (index: number) => void;
	clear: () => void;
}

export interface ICartUI {
	model: ICart;
	content: HTMLElement;
	productList: HTMLElement;
	price: HTMLElement;
	count: HTMLElement;
	updateContent: () => void;
	delete: (
		target: HTMLElement,
		cart: ICart,
		count: HTMLElement,
		price: HTMLElement
	) => void;
}

export interface IBuyer {
	email: HTMLElement;
	phone: HTMLElement;
	events: IEvents;
	setPhone: (phone: string) => void;
	checkValid: () => void;
}

export interface IModal {
	content: HTMLElement;
	closeBtn: HTMLElement;
	actionBtn?: HTMLElement;
	setContent: (content: HTMLElement, actions?: ModalActions) => void;
	open: () => void;
	close: () => void;
}

export interface IBillingForm {
	address: HTMLElement;
	paymentCard: HTMLElement;
	paymentCash: HTMLElement;
	orderButton: HTMLButtonElement;
	content: HTMLElement;
	checkValid: () => void;
}

export interface IComplete {
	button: HTMLButtonElement;
	content: HTMLElement;
	totalPrice: HTMLElement;
}

export enum TEventNames {
	LOAD = 'cards:load',
	OPEN_CARD = 'card:open',
	OPEN_CART = 'cart:open',
	CLEAR_CART = 'cart:clear',
	CLOSE_MODAL = 'modal:close',
	BUY_PRODUCT = 'product:buy',
	SUBMIT_ORDER = 'cart:submit',
	SUBMIT_BILLING = 'billing:submit',
	SUBMIT_BUYER = 'buyer:submit',
}
