import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { TEventNames, IProduct } from './types';
import { Product } from './components/commmon/Product/Product';
import { ProductApi } from './components/commmon/Product/ProductApi';
import { Modal } from './components/commmon/Modal';
import { Cart } from './components/commmon/Cart/Cart';
import { CartUI } from './components/commmon/Cart/CartUI';
import { BillingForm } from './components/commmon/BillingForm';
import { Buyer } from './components/commmon/Buyer';
import { Complete } from './components/commmon/Complete';
import { Order } from './components/commmon/Order';

const api = new ProductApi(API_URL);
const events = new EventEmitter();
const modal = new Modal(ensureElement('#modal-container'));
const cart = new Cart();
const order = new Order();

const cartUI = new CartUI(
	cloneTemplate(ensureElement<HTMLTemplateElement>('#basket')),
	cart,
	{
		onClick: () => {
			events.emit(TEventNames.SUBMIT_ORDER);
		},
	}
);

const billingForm = new BillingForm(
	cloneTemplate(ensureElement<HTMLTemplateElement>('#order')),
	{
		onClick: () => {
			events.emit(TEventNames.SUBMIT_BILLING);
		},
	}
);

const buyer = new Buyer(
	cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')),
	{
		onClick: () => {
			events.emit(TEventNames.SUBMIT_BUYER);
		},
	}
);

const complete = new Complete(
	cloneTemplate(ensureElement<HTMLTemplateElement>('#success')),
	0,
	{
		onClick: () => {
			events.emit(TEventNames.CLOSE_MODAL);
			events.emit(TEventNames.CLEAR_CART);
			cartUI.updateContent();
		},
	}
);

const modalProductTemplate =
	ensureElement<HTMLTemplateElement>('#card-preview');
const productTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const productList = document.querySelector('.gallery');
const cartIcon = document.querySelector('.header__basket');

events.on(TEventNames.OPEN_CARD, (product: IProduct) => {
	modal.setContent(
		new Product(
			cloneTemplate(modalProductTemplate) as HTMLElement,
			product,
			CDN_URL
		).render(),
		{
			onClick: () => {
				events.emit(TEventNames.BUY_PRODUCT, product);
			},
		}
	);
	modal.render();
	modal.open();
});

events.on(TEventNames.CLOSE_MODAL, () => {
	modal.close();
});

events.on(TEventNames.CLEAR_CART, () => {
	cart.clear();
});

events.on(TEventNames.OPEN_CART, () => {
	cartUI.updateContent();
	modal.setContent(cartUI.Content);
	modal.render();
	modal.open();
});

events.on(TEventNames.SUBMIT_ORDER, () => {
	modal.setContent(billingForm.Content);
	order.setItems(cart.Products);
	complete.TotalPrice = cart.TotalPrice;
	modal.render();
});

events.on(TEventNames.BUY_PRODUCT, (product: IProduct) => {
	cart.addProduct(product);
	cartUI.updateContent();
	events.emit(TEventNames.CLOSE_MODAL);
});

events.on(TEventNames.LOAD, () => {
	api.getProducts().then((products: IProduct[]) => {
		products.forEach((product: IProduct) => {
			const card = new Product(
				cloneTemplate(productTemplate) as HTMLElement,
				product,
				CDN_URL,
				{
					onClick: () => {
						events.emit(TEventNames.OPEN_CARD, product);
					},
				}
			);
			productList.appendChild(card.render());
		});
	});
});

events.on(TEventNames.SUBMIT_BILLING, () => {
	modal.setContent(buyer.Content);
	order.setBilling(billingForm.Address, billingForm.Payment);
	modal.render();
});

events.on(TEventNames.SUBMIT_BUYER, () => {
	modal.setContent(complete.Content);
	order.setOrder(buyer.Phone, buyer.Email);
	modal.render();

	api.post('/order', order.Order).then((response) => {
		console.log(response);
	})
});

events.emit(TEventNames.LOAD);
cartIcon.addEventListener('click', () => {
	events.emit('cart:open');
});
