import { ICartUI, IProduct, ModalActions } from '../../../types';
import { Component } from '../../base/component';
import { Cart } from './Cart';
import { ProductShort } from '../Product/ProductShort';
import { cloneTemplate, ensureElement } from '../../../utils/utils';

export class CartUI extends Component<ICartUI> {
	protected content: HTMLElement;
	protected productList: HTMLElement;
	protected price: HTMLElement;
	protected count: HTMLElement;

	constructor(
		container: HTMLElement,
		protected model: Cart,
		actions?: ModalActions
	) {
		super(container);
		this.content = container;
		this.price = this.content.querySelector('.basket__price');
		this.productList = this.content.querySelector('.basket__list');
		this.count = document.querySelector('.header__basket-counter');
		this.count.textContent = String(this.model.Counter);

		this.content
			.querySelector('.basket__button')
			.addEventListener('click', () => {
				actions.onClick();
			});
	}

	updateContent() {
		this.price.textContent = String(this.model.TotalPrice) + ' синапсов';
		this.productList.replaceChildren();
		this.model.Products.forEach((item: IProduct, counter) => {
			const product = new ProductShort(
				cloneTemplate(ensureElement<HTMLTemplateElement>('#card-basket')),
				item,
				++counter,
				this
			);
			this.productList.append(product.render());
		});
		this.count.textContent = String(this.model.Counter);
		if (this.model.Counter === 0) {
			this.setDisabled(this.content.querySelector('.basket__button'), true);
		} else {
			this.setDisabled(this.content.querySelector('.basket__button'), false);
		}
	}

	delete(target: HTMLElement) {
		const index = target
			.closest('.card')
			.querySelector('.basket__item-index').textContent;
		target
			.closest('.basket__list')
			.removeChild(target.closest('.basket__item'));
		this.model.removeProduct(Number(index) - 1);
		this.count.textContent = String(this.model.Counter);
		this.price.textContent = String(this.model.TotalPrice) + ' синапсов';
		this.updateContent();
	}

	get Content() {
		return this.content;
	}
}
