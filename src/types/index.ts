import { IEvents } from "../components/base/events";

type TPayment = 'cash' | 'card';

interface IProduct {
    id: string
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
}

interface IProductData {
    products: IProduct[];
    events: IEvents;
    preview: string | null;
    getProduct: (id: string) => IProduct;
}

interface ICart {
    products: IProduct[];
    totalPrice: number;
    addProduct: (product: IProduct) => void;
    removeProduct: (product: IProduct) => void;
    clear: () => void;
}

interface ICartUI {
    model: ICart;
    content: HTMLElement;
    events: IEvents;
}

interface IBuyer {
    email: HTMLElement;
    phone: HTMLElement;
    events: IEvents
}

interface IModal {
    isOpen: boolean;
    content: HTMLElement;
    events: IEvents;
    closeBtn: HTMLElement;
    sbmBtn?: HTMLElement;
    open: () => void;
    close: () => void;
    closeByOverlay: () => void;
    closeByEsc: (event: KeyboardEvent) => void;
    submit?: () => void;
}

interface IOrder {
    status: string;
    totalPrice: number;
    events: IEvents;
}

interface IBillingForm {
    address: HTMLElement;
    payment: HTMLElement;
    events: IEvents
}

interface ICompletedOrder {
    status: HTMLElement;
    totalPrice: HTMLElement;
}

enum TEventNames {
    "card:open",
    "cart:open",
    "card:close",
    "cart:close",
    "cartProduct:delete",
    "cart:submit",
    "product:buy",
    "billing:submit",
    "buyer:submit",
    "buyer:validate",
    "billing:validate"
}
