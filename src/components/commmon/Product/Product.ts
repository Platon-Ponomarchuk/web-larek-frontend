import { IProduct, ModalActions } from '../../../types/index';
import { Component } from '../../base/component';

export class Product extends Component<IProduct> {
	protected title: HTMLElement;
	protected description: HTMLElement;
	protected image: HTMLImageElement;
	protected category: HTMLElement;
	protected price: HTMLElement;
	protected id: string;

	constructor(
		container: HTMLElement,
		data: IProduct,
		cdn: string,
		actions?: ModalActions
	) {
		super(container);

		if (actions) {
			this.container.addEventListener('click', actions.onClick);
		}

		this.title = this.container.querySelector('.card__title');
		this.description = this.container.querySelector('.card__text');
		this.image = this.container.querySelector('.card__image');
		this.category = this.container.querySelector('.card__category');
		this.price = this.container.querySelector('.card__price');
		this.id = data.id;

		switch (data.category) {
			case 'другое':
				this.category.classList.add('card__category_other');
				break;
			case 'софт-скил':
				this.category.classList.add('card__category_soft');
				break;
			case 'хард-скил':
				this.category.classList.add('card__category_hard');
				break;
			case 'кнопка':
				this.category.classList.add('card__category_button');
				break;
			case 'дополнительное':
				this.category.classList.add('card__category_additional');
				break;
		}

		this.title.textContent = data.title;
		this.image.src = cdn + data.image;
		this.category.textContent = data.category;

		if (this.description) {
			this.description.textContent = data.description;
		}

		if (data.price) {
			this.price.textContent = String(data.price) + ' синапсов';
		} else {
			this.price.textContent = 'Бесценно';
		}
	}
}
