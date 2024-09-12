import { IProduct } from '../../../types';
import { Api, ApiListResponse } from '../../base/api';

export class ProductApi extends Api {
	constructor(baseUrl: string, settings?: RequestInit) {
		super(baseUrl, settings);
	}

	getProducts() : Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) => {
			return data.items;
		});
	}
}
