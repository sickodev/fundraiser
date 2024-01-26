import { create } from "zustand";

type Store = {
    imageUrl: string;
    setImageUrl: (url: string) => void;
};

const useStore = create<Store>((set) => ({
    imageUrl: "",
    setImageUrl: (url: string) =>
        set(() => ({
            imageUrl: url,
        })),
}));

export { useStore };
