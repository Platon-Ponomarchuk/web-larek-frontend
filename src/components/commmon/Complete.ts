import { Component } from '../base/component';
import { IComplete, ModalActions } from '../../types';

export class Complete extends Component<IComplete> {
	protected totalPrice: HTMLElement;
	protected button: HTMLButtonElement;
	protected content: HTMLElement;

	constructor(
		container: HTMLElement,
		totalPrice: number,
		actions?: ModalActions
	) {
		super(container);

		this.content = container;
		this.totalPrice = this.container.querySelector(
			'.order-success__description'
		);
		this.button = this.container.querySelector('.order-success__close');

		this.totalPrice.textContent = 'Списано ' + String(totalPrice) + ' синапсов';
		this.button.addEventListener('click', () => {
			actions?.onClick();
		});
	}

	get Content() {
		return this.content;
	}

	set TotalPrice(price: number) {
		this.totalPrice.textContent = 'Списано ' + String(price) + ' синапсов';
	}
}
