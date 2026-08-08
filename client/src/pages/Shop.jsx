import ProductGrid from "../components/shop/ProductGrid";
import FilterSidebar from "../components/shop/FilterSidebar";
import SortDropdown from "../components/shop/SortDropdown";
import Container from "../components/layout/Container";
import SearchBar from "../components/shop/SearchBar";

import { FiFilter } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAllProducts } from "../api/productApi";

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get("search") || "";

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    const PRODUCTS_PER_PAGE = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const sort =
                    sortBy === "lowToHigh"
                        ? "price_low"
                        : sortBy === "highToLow"
                            ? "price_high"
                            : "newest";

                const { data } = await getAllProducts({
                    page: currentPage,
                    limit: PRODUCTS_PER_PAGE,
                    category: selectedCategory,
                    search: searchTerm,
                    sort,
                });

                setProducts(data.products);
                setTotalPages(data.pagination.totalPages);
                setTotalProducts(data.pagination.totalProducts);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [
        currentPage,
        selectedCategory,
        searchTerm,
        sortBy,
    ]);

    // Categories
    const categories = [
        "All",
        ...new Set(
            products.map((product) => product.category)
        ),
    ];

    // Category counts
    const categoryCounts = products.reduce(
        (acc, product) => {
            acc[product.category] =
                (acc[product.category] || 0) + 1;

            return acc;
        },
        {}
    );

    // Price filtering
    const filteredProducts = products.filter((product) => {
        switch (priceRange) {
            case "0-500":
                return product.price <= 500;

            case "500-1000":
                return (
                    product.price > 500 &&
                    product.price <= 1000
                );

            case "1000-5000":
                return (
                    product.price > 1000 &&
                    product.price <= 5000
                );

            case "5000+":
                return product.price > 5000;

            default:
                return true;
        }
    });

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);

        // Filter change hone par page 1
        setCurrentPage(1);
    };

    const handlePriceChange = (price) => {
        setPriceRange(price);

        // Filter change hone par page 1
        setCurrentPage(1);
    };

    const handleSortChange = (value) => {
        setSortBy(value);

        // Sort change hone par page 1
        setCurrentPage(1);
    };

    const handleSearchChange = (value) => {
        if (value.trim()) {
            setSearchParams({
                search: value,
            });
        } else {
            setSearchParams({});
        }

        // Search change hone par page 1
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSearchParams({});

        setSelectedCategory("All");
        setPriceRange("All");
        setSortBy("default");

        setCurrentPage(1);
    };

    if (loading) {
        return (
            <Container>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <h2 className="text-xl font-semibold">
                        Loading Products...
                    </h2>
                </div>
            </Container>
        );
    }

    return (
        <section className="py-6">
            <Container>

                {/* Header */}
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div className="flex justify-between gap-3">
                        <h1 className="text-3xl font-bold">
                            Shop Plants
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Showing {totalProducts}{" "}
                            {totalProducts === 1 ? "Product" : "Products"}
                        </p>
                    </div>

                    <div className="flex justify-between gap-3">

                        <SortDropdown
                            sortBy={sortBy}
                            setSortBy={handleSortChange}
                        />

                        <button
                            onClick={handleClearFilters}
                            className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                        >
                            Clear
                        </button>

                    </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={handleSearchChange}
                    />
                </div>

                {/* Mobile Filter */}
                <div className="mb-6 lg:hidden">
                    <button
                        onClick={() =>
                            setIsFilterOpen(true)
                        }
                        className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-white"
                    >
                        <FiFilter />
                        Filters
                    </button>
                </div>

                {/* Main Layout */}
                <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr]">

                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block">

                        <FilterSidebar
                            categories={categories}
                            categoryCounts={categoryCounts}
                            totalProducts={products.length}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={
                                handleCategoryChange
                            }
                            priceRange={priceRange}
                            setPriceRange={
                                handlePriceChange
                            }
                        />

                    </div>

                    {/* Products */}
                    <div>

                        <ProductGrid
                            products={filteredProducts}
                        />

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-10 flex items-center justify-center gap-2">

                                {/* Previous */}
                                <button
                                    disabled={
                                        currentPage === 1
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            (prev) =>
                                                prev - 1
                                        )
                                    }
                                    className="rounded-lg border px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-100"
                                >
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                {Array.from(
                                    {
                                        length: totalPages,
                                    },
                                    (_, index) => {
                                        const page =
                                            index + 1;

                                        return (
                                            <button
                                                key={page}
                                                onClick={() =>
                                                    setCurrentPage(
                                                        page
                                                    )
                                                }
                                                className={`rounded-lg px-4 py-2 ${currentPage ===
                                                    page
                                                    ? "bg-green-700 text-white"
                                                    : "border hover:bg-gray-100"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    }
                                )}

                                {/* Next */}
                                <button
                                    disabled={
                                        currentPage ===
                                        totalPages
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            (prev) =>
                                                prev + 1
                                        )
                                    }
                                    className="rounded-lg border px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-100"
                                >
                                    Next
                                </button>

                            </div>
                        )}

                    </div>
                </div>

                {/* Mobile Filter Drawer */}
                {isFilterOpen && (
                    <div className="fixed inset-0 z-50 bg-black/50">

                        <div className="absolute left-0 top-0 h-full w-72 bg-white p-5 shadow-xl">

                            <div className="mb-6 flex items-center justify-between">

                                <h2 className="text-xl font-bold">
                                    Filters
                                </h2>

                                <button
                                    onClick={() =>
                                        setIsFilterOpen(false)
                                    }
                                    className="text-2xl"
                                >
                                    ×
                                </button>

                            </div>

                            <FilterSidebar
                                categories={categories}
                                categoryCounts={categoryCounts}
                                totalProducts={products.length}
                                selectedCategory={
                                    selectedCategory
                                }
                                setSelectedCategory={
                                    handleCategoryChange
                                }
                                priceRange={priceRange}
                                setPriceRange={
                                    handlePriceChange
                                }
                            />

                        </div>

                    </div>
                )}

            </Container>
        </section>
    );
}