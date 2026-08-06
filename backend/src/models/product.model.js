import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Plant", "Pot", "Fertilizer", "Seed"],
    },

    price: {
  type: Number,
  required: true,
  min: 0,
},

    stock: {
  type: Number,
  default: 0,
  min: 0,
},

    rating: {
  type: Number,
  default: 0,
  min: 0,
  max: 5,
},

    description: {
      type: String,
      required: true,
    },

    images: [
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
],

    specifications: {
      type: Map,
      of: String,
      default: {},
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
// productSchema.index({ slug: 1 });

// productSchema.index({ category: 1 });

// productSchema.index({ isFeatured: 1 });