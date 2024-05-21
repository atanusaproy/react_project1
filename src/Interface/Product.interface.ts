export interface IProducts {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    category:    string;
    image:       string;
    rating:      IProductRating;
}

export enum IProductCategory {
    Electronics = "electronics",
    Jewelery = "jewelery",
    MenSClothing = "men's clothing",
    WomenSClothing = "women's clothing",
}

export interface IProductRating {
    rate:  number;
    count: number;
}
