const {z} = require('zod');
const {ProductSchema} = require('../models/products-schema');
const {Op} = require('sequelize');

const productValidator = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(5).max(200),
    price: z.number().positive(),
    stock: z.number().positive(),
    discountedPrice: z.number().positive().nullable(),
    quantity: z.number(),
    image: z.string().optional(),
    category: z.string(),
    brand: z.string(),
    rating: z.number().optional(),
})


async function getAllProducts(req, res) {
    const {category, minPrice, maxPrice, page=1, limit=10, sort='createdAt', order='asc', search, brand} = req.query;
    console.log(maxPrice, minPrice);
    const where = {};
   try 
   { 
    if(category) {
        where.category = category;
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
        where.brand = brand;
    }
    if(search) {
        where.name = {[Op.iLike]: `%${search}%`};
    }
    const products = await ProductSchema.findAll({where, limit: Number(limit), offset: (Number(page) - 1) * Number(limit), order: [[sort, order.toUpperCase()]]});
    if(!products) {
        return res.status(404).json({success: false, message: 'Products not found'});
    }
    res.status(200).json({success: true, message: 'Products retrieved successfully', products});
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
        res.status(500).json({success: false, message: error.message});
    }
 }
async function createProduct(req, res) {
    const validProduct = productValidator.safeParse(req.body);
if(!validProduct.success) {
    const error = JSON.parse(validProduct.error.message);
    return res.status(400).json({success: false, message: error});
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

async function deleteProduct(req, res) {
    const productId = req.params.id;
    if(!productId) {
        return res.status(400).json({success: false, message: 'Product id is required'});
    }
    try {
        const deletedProduct = await ProductSchema.destroy({where: {id: productId}});
        if(!deletedProduct) {
           return res.status(404).json({success: false, message: 'Product not found'});
        }
        res.status(204).json({success: true, message: 'Product deleted'});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
module.exports = {
    getAllProducts,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
}