import { IProductCategory, IProducts } from "../Interface/Product.interface"
import ApiService from "../GlobalAPIservice/api.service"

export default class ProductService extends ApiService{
    async getProductList(){
        const result = await this.client().get<IProducts[]>('/products');
        return result.data;
    }
    
    async getProductCat(){
        const result = await this.client().get<IProductCategory[]>('/products/categories');
        return result.data;
    }
}