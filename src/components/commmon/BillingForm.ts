import { Component } from '../base/component';
import { IBillingForm, ModalActions } from '../../types';

export class BillingForm extends Component<IBillingForm> {
	protected address: HTMLInputElement;
	protected paymentCard: HTMLElement;
	protected paymentCash: HTMLElement;
	protected orderButton: HTMLButtonElement;
	protected content: HTMLElement;

	constructor(container: HTMLElement, actions?: ModalActions) {
		super(container);

		this.content = container;
		this.address = this.container.querySelector('.form__input');
		this.paymentCard = this.container.querySelector('[name="card"]');
		this.paymentCash = this.container.querySelector('[name="cash"]');
		this.orderButton = this.container.querySelector('.order__button');

		this.paymentCard.addEventListener('click', () => {
			this.paymentCard.classList.add('button_alt-active');
			this.paymentCash.classList.remove('button_alt-active');
			this.checkValid();
		});

		this.paymentCash.addEventListener('click', () => {
			this.paymentCash.classList.add('button_alt-active');
			this.paymentCard.classList.remove('button_alt-active');
			this.checkValid();
		});

		this.address.addEventListener('input', () => {
			this.checkValid();
		});

		this.content.addEventListener('submit', (event) => {
			event.preventDefault();
			actions?.onClick();
		});
	}

	get Content() {
		return this.content;
	}

	get Address() {
		return this.address.value;
	}

	get Payment() {
		return this.paymentCard.classList.contains('button_alt-active')
			? 'online'
			: 'cash';
	}

	checkValid() {
		if (
			this.address.value !== '' &&
			(this.paymentCash.classList.contains('button_alt-active') ||
				this.paymentCard.classList.contains('button_alt-active'))
		) {
			this.setDisabled(this.orderButton, false);
		} else {
			this.setDisabled(this.orderButton, true);
		}
	}
}
