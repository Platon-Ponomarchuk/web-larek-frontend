import { Component } from '../base/component';
import { IBuyer, ModalActions } from '../../types';

export class Buyer extends Component<IBuyer> {
	protected email: HTMLInputElement;
	protected phone: HTMLInputElement;
	protected content: HTMLElement;
	protected submitButton: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ModalActions) {
		super(container);
		this.content = container;

		this.phone = this.container.querySelector('[name="phone"]');
		this.email = container.querySelector('[name="email"]');
		this.submitButton = container.querySelector('.button');

		this.phone.addEventListener('click', () => this.setPhone('+7 ('));

		this.phone.addEventListener('input', () => {
			this.checkValid();
		});

		this.email.addEventListener('input', () => {
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

	get Phone() {
		return this.phone.value;
	}

	get Email() {
		return this.email.value;
	}

	setPhone(phone: string) {
		if (this.phone.value === '') {
			this.phone.value = phone;
		}
	}

	checkValid() {
		if (this.phone.validity.valid && this.email.validity.valid) {
			this.setDisabled(this.submitButton, false);
		} else {
			this.setDisabled(this.submitButton, true);
		}
	}
}
