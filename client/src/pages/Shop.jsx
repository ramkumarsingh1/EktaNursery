import ProductGrid from "../components/shop/ProductGrid";
import FilterSidebar from "../components/shop/FilterSidebar";
import SortDropdown from "../components/shop/SortDropdown";
import Container from "../components/layout/Container";
import SearchBar from "../components/shop/SearchBar";

import { FiFilter } from "react-icons/fi";
import { useEffect, useState } from "react";

import { getAllProducts } from "../api/productApi";

export default function Shop() {
    const [selectedCategory, setSelectedCategory] =
        useState("All");

    const [priceRange, setPriceRange] =
        useState("All");

    const [sortBy, setSortBy] =
        useState("default");

    // Search input shown in UI
    const [searchInput, setSearchInput] =
        useState("");

    // Actual search sent to backend
    const [searchTerm, setSearchTerm] =
        useState("");

    const [isFilterOpen, setIsFilterOpen] =
        useState(false);

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // Pagination
    const [currentPage, setCurrentPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [categoryStats, setCategoryStats] =
        useState([]);

    const [totalProducts, setTotalProducts] =
        useState(0);

    const PRODUCTS_PER_PAGE = 6;

  
    // SEARCH DEBOUNCE
   
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(searchInput.trim());
            setCurrentPage(1);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchInput]);

   
    // FETCH PRODUCTS
   
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
                    category:
                        selectedCategory === "All"
                            ? ""
                            : selectedCategory,
                    search: searchTerm,
                    sort,
                    priceRange,
                });

                setProducts(
                    data.products || []
                );

                setTotalPages(
                    data.pagination?.totalPages || 1
                );

                setTotalProducts(
                    data.pagination?.totalProducts || 0
                );

                setCategoryStats(
                    data.categoryStats || []
                );

            } catch (error) {
                console.error(
                    "Fetch Products Error:",
                    error
                );

                setProducts([]);
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
        priceRange,
    ]);

 
    // CATEGORIES
   
    const categories = [
        "All",
        ...categoryStats.map(
            (item) => item._id
        ),
    ];

  
    // CATEGORY COUNTS
   
    const categoryCounts =
        categoryStats.reduce(
            (acc, item) => {
                acc[item._id] = item.count;
                return acc;
            },
            {}
        );

   
    // CATEGORY CHANGE
   
    const handleCategoryChange = (
        category
    ) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

 
    // PRICE CHANGE
   
    const handlePriceChange = (
        price
    ) => {
        setPriceRange(price);
        setCurrentPage(1);
    };

  
    // SORT CHANGE
    
    const handleSortChange = (
        value
    ) => {
        setSortBy(value);
        setCurrentPage(1);
    };


   
    // CLEAR
   
    const handleClearFilters = () => {
        setSearchInput("");
        setSearchTerm("");

        setSelectedCategory("All");
        setPriceRange("All");
        setSortBy("default");

        setCurrentPage(1);
    };

    return (
        <section className="py-1">
            <Container>

                {/* Header */}
                <div className="hidden md:flex mb-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div className="flex justify-between gap-3">

                        <h1 className="text-2xl font-bold">
                            Shop Plants
                        </h1>

                        <p className="mt-1.5 text-gray-500">
                            Showing{" "}
                            {totalProducts}{" "}
                            {totalProducts === 1
                                ? "Product"
                                : "Products"}
                        </p>

                    </div>

                    <div className="flex justify-between gap-3">

                        <SortDropdown
                            sortBy={sortBy}
                            setSortBy={
                                handleSortChange
                            }
                        />

                        <button
                            onClick={
                                handleClearFilters
                            }
                            className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                        >
                            Clear
                        </button>

                    </div>

                </div>

                {/* Search */}
                <div className="mb-4">

                    <SearchBar
                        searchTerm={searchInput}
                        setSearchTerm={setSearchInput}
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
                            categories={
                                categories
                            }
                            categoryCounts={
                                categoryCounts
                            }
                            totalProducts={
                                totalProducts
                            }
                            selectedCategory={
                                selectedCategory
                            }
                            setSelectedCategory={
                                handleCategoryChange
                            }
                            priceRange={
                                priceRange
                            }
                            setPriceRange={
                                handlePriceChange
                            }
                        />

                    </div>

                    {/* Products */}
                    <div>

                        {loading ? (
                            <div className="flex min-h-[300px] items-center justify-center">
                                <p className="text-lg font-semibold text-gray-500">
                                    Loading Products...
                                </p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="flex min-h-[300px] items-center justify-center">
                                <p className="text-lg font-semibold text-gray-500">
                                    No products found
                                </p>
                            </div>
                        ) : (
                            <ProductGrid
                                products={products}
                            />
                        )}

                        {/* Pagination */}
                        {!loading &&
                            totalPages > 1 && (
                                <div className="mt-10 flex items-center justify-center gap-2">

                                    {/* Previous */}
                                    <button
                                        disabled={
                                            currentPage ===
                                            1
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
                                            length:
                                                totalPages,
                                        },
                                        (_, index) => {
                                            const page =
                                                index + 1;

                                            return (
                                                <button
                                                    key={
                                                        page
                                                    }
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
                                                    {
                                                        page
                                                    }
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
                                        setIsFilterOpen(
                                            false
                                        )
                                    }
                                    className="text-2xl"
                                >
                                    ×
                                </button>

                            </div>

                            <FilterSidebar
                                categories={
                                    categories
                                }
                                categoryCounts={
                                    categoryCounts
                                }
                                totalProducts={
                                    totalProducts
                                }
                                selectedCategory={
                                    selectedCategory
                                }
                                setSelectedCategory={
                                    handleCategoryChange
                                }
                                priceRange={
                                    priceRange
                                }
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