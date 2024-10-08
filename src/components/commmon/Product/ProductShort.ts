import { IProduct } from '../../../types/index';
import { Component } from '../../base/component';
import { Cart } from '../Cart/Cart';
import { CartUI } from '../Cart/CartUI';

export class ProductShort extends Component<IProduct> {
	protected title: HTMLElement;
	protected price: HTMLElement;
	protected counter: HTMLElement;
	protected deleteBtn: HTMLElement;

	constructor(
		container: HTMLElement,
		data: IProduct,
		counter: number,
		cartUI: CartUI
	) {
		super(container);

		this.title = this.container.querySelector('.card__title');
		this.price = this.container.querySelector('.card__price');
		this.counter = this.container.querySelector('.basket__item-index');
		this.deleteBtn = this.container.querySelector('.basket__item-delete');

		this.title.textContent = data.title;
		if (data.price) {
			this.price.textContent = String(data.price) + ' синапсов';
		} else {
			this.price.textContent = 'Бесценно';
		}
		this.counter.textContent = String(counter);

		this.deleteBtn.addEventListener('click', () => {
			cartUI.delete(this.deleteBtn);
		});
	}
}
