export default class productDto {
    constructor(product) {
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.category = product.category;
        this.thumbnail = product.thumbnail;
        this.variants = product.variants;
    }
    static getProductDto(product) {
        return {
            id: product._id,
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            thumbnail: product.thumbnail,
            variants: product.variants
        }
    }
}