const {z} = require('zod');
const {ProductSchema} = require('../models/products-schema');
const {sequelize} = require('../utils/db');
const {Op, literal, where} = require('sequelize');

const productValidator = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(5).max(200),
    price: z.number().positive(),
    stock: z.number().positive(),
    discountedPrice: z.number().positive().nullable(),
    quantity: z.number().positive(),
    category: z.string(),
    brand: z.string(),
    rating: z.number().optional(),
})


async function getAllProducts(req, res) {
    const {categories, minPrice, maxPrice, page=1, limit=20, sort='createdAt', order='asc', name, brand} = req.query;
    const where = {};
   try 
   { 
    if(categories) {
        const category = categories.split(',');
        where.category = Array.isArray(category)
    ? { [Op.in]: category }
    : category;
    }
    if(minPrice || maxPrice) {
        where.price = {}
        if(minPrice) {
        where.price = {[Op.gte]: Number(minPrice)};
        }
    if(maxPrice) {
        where.price = {[Op.lte]: Number(maxPrice)};
    }
}
    if(minPrice && maxPrice) {
        where.price = {[Op.between]: [Number(minPrice), Number(maxPrice)]};
    }
    if(brand) {
        where.brand = {[Op.iLike]: `%${brand}%`};
    }
    if(name) {
        where.name = {[Op.iLike]: `%${name}%`};
    }
    const allProducts = await ProductSchema.findAll({where});
    const products = await ProductSchema.findAll({where, limit: Number(limit), offset: (Number(page) - 1) * Number(limit), order: [[sort, order.toUpperCase()]]});
    const pages = Math.ceil(allProducts.length / limit);
    if(!products) {
        return res.status(404).json({success: false, message: 'Products not found'});
    }
    res.status(200).json({success: true, message: 'Products retrieved successfully', products, pages});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
}
 async function getOneProduct(req, res) { 
    const productId = req.params.id;
    if(!productId) {
        return res.status(400).json({success: false, message: 'Product id is required'});
    }
    try {
        const product = await ProductSchema.findByPk(productId);
        if(!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }
        res.status(200).json({success: true, message: 'Product found', product});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
 }
async function createProduct(req, res) {
    const validProduct = productValidator.safeParse(req.body);
if(!validProduct.success) {
    const error = JSON.parse(validProduct.error.message);
    console.log(error[0].message);
    return res.status(400).json({success: false, message: error[0].message});
}
try {
    const newproduct = await ProductSchema.create(validProduct.data);
    if(!newproduct) {
        throw new Error('Product not created');
    }
    res.status(201).json({success: true, message: 'Product created', newproduct});
} catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

async function updateProduct(req, res) {
    const validProduct = productValidator.partial().safeParse(req.body);
    console.log(validProduct);
    if(!validProduct.success) {
        return res.status(400).json({success: false, message: validProduct.error.issues});
    }
    const productId = req.params.id;
    if(!productId) {
        return res.status(400).json({success: false, message: 'Product id is required'});
    }
    try {
        const product = await ProductSchema.findByPk(productId);
        if(!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }
  await product.update(validProduct.data);
        res.status(200).json({success: true, message: 'Product updated', product});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

async function getCategories(req, res) {
    try {
        const categories = await ProductSchema.findAll({ attributes: [
    [sequelize.fn('DISTINCT', sequelize.col('category')), 'category']
  ]});
        if(!categories) {
            return res.status(404).json({success: false, message: 'Categories not found'});
        }
        res.status(200).json({success: true, message: 'Categories retrieved successfully', categories});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
async function getProductsByCategory(req, res) {
    const category = req.params.category;
    if(!category) {
        return res.status(400).json({success: false, message: 'Category is required'});
    }
    try {
        const products = await ProductSchema.findAll({where: {category}});
        if(!products) {
            return res.status(404).json({success: false, message: 'Products not found'});
        }
        res.status(200).json({success: true, message: 'Products retrieved successfully', products});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
async function getTopProducts(req, res) {
    try {
        const [topRatedProducts, recentlyAdded, TopSales] = await Promise.all([
            ProductSchema.findAll({order: [['rating', 'DESC']], limit: 10}), 
        ProductSchema.findAll({order: [['createdAt', 'DESC']], limit: 10}), 
        ProductSchema.findAll({where: {discountedPrice: {[Op.ne]: null}}, order: [[literal('(price - "discountedPrice") / price'), 'DESC']], limit: 10})]);
        if(!topRatedProducts || !recentlyAdded || !TopSales) {
            return res.status(404).json({success: false, message: 'Products not found'});
        }
        res.status(200).json({success: true, message: 'Products retrieved successfully', topRatedProducts, recentlyAdded, TopSales});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
}
async function deleteProduct(req, res) {
    const productId = req.params.id;
    console.log(productId);
    if(!productId) {
        return res.status(400).json({success: false, message: 'Product id is required'});
    }
    try {
        const deletedProduct = await ProductSchema.destroy({where: {id: productId}});
        console.log(deletedProduct);
        if(!deletedProduct) {   
           return res.status(404).json({success: false, message: 'Product not found'});
        }
        res.status(200).json({success: true, message: 'Product deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}
module.exports = {
    getAllProducts,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    getProductsByCategory,
    getTopProducts
}