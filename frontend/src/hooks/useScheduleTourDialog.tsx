import { create } from "zustand";

interface ScheduleTourState {
  type: "in-person" | "video-chat";
  date: Date | undefined;
  time: Date | undefined;
  name: string;
  email: string;
  phone: string;
  setType: (type: "in-person" | "video-chat") => void;
  setDate: (date: Date | undefined) => void;
  setTime: (time: Date | undefined) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  submit: (
    data: Omit<
      ScheduleTourState,
      | "submit"
      | "reset"
      | "setType"
      | "setDate"
      | "setTime"
      | "setName"
      | "setEmail"
      | "setPhone"
    >,
  ) => void;
  reset: () => void;
}

export const useScheduleTourDialog = create<ScheduleTourState>((set) => ({
  type: "in-person",
  date: undefined,
  time: undefined,
  name: "",
  email: "",
  phone: "",
  setType: (type) => set({ type }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),
  submit: (data) => {
    set((state) => ({ ...state, ...data }));
  },
  reset: () =>
    set({
      type: "in-person",
      date: undefined,
      time: undefined,
      name: "",
      email: "",
      phone: "",
    }),
}));
