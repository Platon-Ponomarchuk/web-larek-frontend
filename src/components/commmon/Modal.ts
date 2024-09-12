import { Component } from '../base/component';
import { IModal, ModalActions } from '../../types';

export class Modal extends Component<IModal> {
	protected content: HTMLElement;
	protected closeBtn: HTMLElement;
	protected actionBtn?: HTMLButtonElement;

	constructor(container: HTMLElement) {
		super(container);

		this.closeBtn = this.container.querySelector('.modal__close');
		this.content = this.container.querySelector('.modal__content');

		this.closeBtn.addEventListener('click', () => {
			this.close();
		});

		container.addEventListener('click', (event) => {
			if (event.target === container) {
				this.close();
			}
		});
	}

	setContent(content: HTMLElement, actions?: ModalActions) {
		this.content.replaceChildren();

		if (content.querySelector('.card__button')) {
			this.actionBtn = content.querySelector('.card__button');

			this.actionBtn.addEventListener('click', actions?.onClick);

			if (content.querySelector('.card__price').textContent === 'Бесценно') {
				this.setDisabled(this.actionBtn, true);
			}
		}

		this.content.append(content);
	}

	open() {
		this.toggleClass(this.container, 'modal_active');
	}

	close() {
		this.toggleClass(this.container, 'modal_active');
		this.content.replaceChildren();
	}
}
