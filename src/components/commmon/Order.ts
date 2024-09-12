import { IProduct } from "../../types";

export class Order {
    protected phone: string;
    protected address: string;
    protected payment: string;
    protected email: string;
    protected items: string[];
    protected total: number;

    constructor() {
        this.phone = '';
        this.address = '';
        this.payment = '';
        this.email = '';
        this.items = [];
        this.total = 0;
    }

    setBilling(address: string, payment: string) {
        this.address = address;
        this.payment = payment;
    }

    setOrder(phone: string, email: string) {
        this.phone = phone;
        this.email = email;
    }

    setItems(items: IProduct[]) {
        this.items = [];
        this.total = 0;

        items.forEach((item) => {
            this.items.push(item.id);
            this.total += item.price;
        })
    }
    
    get Order() {
        return {
            phone: this.phone,
            address: this.address,
            payment: this.payment,
            email: this.email,
            items: this.items,
            total: this.total
        }
    }

}