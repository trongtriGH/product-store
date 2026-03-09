import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
    // products state
    products: [],
    loading: false,
    error: null,
    currentProduct: null,

    // modal state
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),

    formData: {
        name: "",
        price: "",
        image: "",
    },

    setFormData: (formData) => set({ formData }),

    resetFormData: () =>
        set({
            formData: { name: "", price: "", image: "" },
        }),

    addProduct: async (e) => {
        e.preventDefault();
        set({ loading: true });
        try {
            const { formData } = get();
            const response = await axios.post(`${BASE_URL}/api/products`, formData);
            // update products
            set((prevState) => ({
                products: [response.data.data, ...prevState.products],
                error: null,
            }));
            toast.success("Product added successfully.");
            get().resetFormData();

            // ✅ close modal automatically after adding
            get().closeModal();
        } catch (err) {
            console.log("Error in addProduct function:", err);
            toast.error("Something went wrong while adding the product.");
        } finally {
            set({ loading: false });
        }
    },

    fetchProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/api/products`);
            set({ products: response.data.data, error: null });
        } catch (err) {
            if (err.status === 429) {
                set({ error: "Too many requests. Please try again later.", products: [] });
            } else {
                set({ error: "Something went wrong while fetching products.", products: [] });
            }
        } finally {
            set({ loading: false });
        }
    },

    deleteProduct: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set((prevState) => ({
                products: prevState.products.filter((product) => product.id !== id),
                error: null,
            }));
            toast.success("Product deleted successfully.");
        } catch (err) {
            console.error("Error in deleteProduct function:", err);
            toast.error("Something went wrong while deleting the product.");
        } finally {
            set({ loading: false });
        }
    },

    fetchProduct: async (id) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/api/products/${id}`);
            set({ currentProduct: response.data.data, formData: response.data.data, error: null });
        } catch (error) {
            console.error("Error in fetchProduct function:", error);
            set({ error: "Something went wrong while fetching the product.", currentProduct: null });
        } finally {
            set({ loading: false });
        }
    },

    updateProduct: async (id) => {
        set({ loading: true });
        try {
            const { formData } = get();
            const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
            set({ currentProduct: response.data.data });
            set((prevState) => ({
                products: prevState.products.map((product) =>
                    product.id === id ? response.data.data : product
                ),
                error: null,
            }));
            toast.success("Product updated successfully.");
        } catch (error) {
            console.error("Error in updateProduct function:", error);
            toast.error("Something went wrong while updating the product.");
        } finally {
            set({ loading: false });
        }
    }
}));