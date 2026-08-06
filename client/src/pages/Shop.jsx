
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
    const [sortBy, setSortBy] = useState("default");
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const {data} = await getAllProducts();
                console.log(data.products);
                setProducts(data.products);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    const filteredProducts = (products || []).filter((product) => {
        const categoryMatch =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const searchMatch =
            product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        return categoryMatch && searchMatch;
    });
    const sortedProducts = [...filteredProducts];

    if (sortBy === "lowToHigh") {
        sortedProducts.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "highToLow") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    const handleClearFilters = () => {
        setSearchParams({});
        setSelectedCategory("All");
        setSortBy("default");
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
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">

                    <div className="flex gap-3 justify-between">
                        <h1 className="text-3xl font-bold">
                            Shop Plants
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Showing {sortedProducts.length}{" "}
                            {sortedProducts.length === 1 ? "Product" : "Products"}
                        </p>
                    </div>

                    <div className="flex gap-3 justify-between">

                        <SortDropdown
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />

                        <button
                            onClick={handleClearFilters}
                            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
                        >
                            Clear
                        </button>

                    </div>

                </div>
                <div className="mb-6">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={(value) => {
                            if (value.trim()) {
                                setSearchParams({ search: value });
                            } else {
                                setSearchParams({});
                            }
                        }}
                    />
                </div>
                <div className="mb-6 lg:hidden">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-white"
                    >
                        <FiFilter />
                        Filters
                    </button>
                </div>
                <div className="grid lg:grid-cols-[280px_1fr] gap-8">

                    <div className="hidden lg:block">
                        <FilterSidebar
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>

                    <ProductGrid
                        products={sortedProducts}
                    />
                </div>

                {
                    isFilterOpen && (
                        <div className="fixed inset-0 z-50 bg-black/50">

                            <div className="absolute left-0 top-0 h-full w-72 bg-white p-5 shadow-xl">

                                <div className="flex justify-between items-center mb-6">

                                    <h2 className="text-xl font-bold">
                                        Filters
                                    </h2>

                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="text-2xl"
                                    >
                                        ×
                                    </button>

                                </div>

                                <FilterSidebar
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                />

                            </div>

                        </div>
                    )
                }
            </Container>
        </section>
    );
}