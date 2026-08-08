import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Upload image to Cloudinary
const uploadToCloudinary = async (filePath) => {
  console.log("Uploading:", filePath);
  console.log("Config:", cloudinary.config());

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "EktaNursery",
    });

    console.log("UPLOAD SUCCESS:", result);

    return result;
  } catch (err) {
    console.log("UPLOAD ERROR:");
    console.dir(err, { depth: null });

    throw err;
  }
};
// GET /api/v1/products
export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      search,
      page = 1,
      limit = 8,
      sort = "newest",
    } = req.query;

    const filter = {
      isActive: true,
    };

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    let sortOption = {
      createdAt: -1,
    };

    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      case "price_low":
        sortOption = { price: 1 };
        break;

      case "price_high":
        sortOption = { price: -1 };
        break;

      case "rating":
        sortOption = { rating: -1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const currentPage = Number(page);
    const pageLimit = Number(limit);

    const totalProducts = await Product.countDocuments(filter);
    const categoryStats = await Product.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip((currentPage - 1) * pageLimit)
      .limit(pageLimit);

    res.status(200).json({
      success: true,
      products,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalProducts / pageLimit),
        totalProducts,
        hasNextPage:
          currentPage < Math.ceil(totalProducts / pageLimit),
        hasPrevPage: currentPage > 1,
      },
      categoryStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/v1/products
export const createProduct = async (req, res) => {
  try {
    const { name, slug, category, price, description } = req.body;

    if (
      !name ||
      !slug ||
      !category ||
      price === undefined ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingProduct = await Product.findOne({ slug });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with this slug already exists",
      });
    }

    let uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          console.log(cloudinary.config());
          const result = await uploadToCloudinary(file.path);

          uploadedImages.push({
            url: result.secure_url,
            public_id: result.public_id,
          });

          // Delete local file after upload
          fs.unlinkSync(file.path);

        } catch (err) {
          console.error("Cloudinary Upload Error:", err);

          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }
      }
    }

    if (req.body.specifications) {
      req.body.specifications = JSON.parse(req.body.specifications);
    }

    const product = await Product.create({
      ...req.body,

      price: Number(req.body.price),

      stock: Number(req.body.stock),

      rating: Number(req.body.rating),

      isFeatured:
        req.body.isFeatured === "true",

      isActive:
        req.body.isActive === "true",

      images: uploadedImages,
    });

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });

  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Specifications string ko object me convert karo
    if (req.body.specifications) {
      req.body.specifications = JSON.parse(req.body.specifications);
    }
    req.body.price = Number(req.body.price);

    req.body.stock = Number(req.body.stock);

    req.body.rating = Number(req.body.rating);

    req.body.isFeatured =
      req.body.isFeatured === "true";

    req.body.isActive =
      req.body.isActive === "true";
    // Agar nayi image upload hui hai
    if (req.files && req.files.length > 0) {
      let uploadedImages = [];

      // Purani Cloudinary images delete karo
      for (const image of product.images) {
        if (image.public_id) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }

      // Nayi images upload karo
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.path);

        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });

        // Local file delete
        fs.unlinkSync(file.path);
      }

      req.body.images = uploadedImages;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE Product (Soft Delete)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.isActive = false;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};