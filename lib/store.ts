import { create } from "zustand";
import { nanoid } from "nanoid";

type Stage =
  | "New Lead"
  | "Contacted"
  | "Qualified"
  | "Proposal"
  | "Negotiation"
  | "Won"
  | "Lost";

export type Deal = {
  id: string;
  title: string;
  property: string;
  value: number;
  stage: Stage;
  owner: string;
  score: number;
  closeDate?: string;
};

export type Activity = {
  id: string;
  type: "call" | "email" | "note" | "task" | "event";
  title: string;
  actor: string;
  target: string;
  at: string;
};

export type BudgetItem = {
  id: string;
  label: string;
  amount: number;
  category: "Marketing" | "Renovation" | "Staging" | "Commission" | "Misc";
  status: "Planned" | "Committed" | "Spent";
};

export type EventCollab = {
  id: string;
  name: string;
  date: string;
  location: string;
  partner: string;
};

type Store = {
  deals: Deal[];
  activities: Activity[];
  budgets: BudgetItem[];
  events: EventCollab[];
  addDeal: (input: Omit<Deal, "id">) => void;
  moveDeal: (id: string, stage: Stage) => void;
  addActivity: (input: Omit<Activity, "id">) => void;
  addBudget: (input: Omit<BudgetItem, "id">) => void;
  addEvent: (input: Omit<EventCollab, "id">) => void;
};

const today = new Date();

export const useCRMStore = create<Store>((set) => ({
  deals: [
    { id: nanoid(), title: "Villa Azure Listing", property: "Dubai Marina", value: 1250000, stage: "Negotiation", owner: "Lina", score: 88 },
    { id: nanoid(), title: "Penthouse Skyline", property: "Casablanca Corniche", value: 830000, stage: "Proposal", owner: "Amine", score: 73 },
    { id: nanoid(), title: "Soho Lofts", property: "NYC", value: 2100000, stage: "Contacted", owner: "Chris", score: 65 }
  ],
  activities: [
    { id: nanoid(), type: "call", title: "Buyer discovery", actor: "Lina", target: "Villa Azure", at: "Today" },
    { id: nanoid(), type: "email", title: "Proposal sent", actor: "Amine", target: "Penthouse Skyline", at: "Yesterday" },
    { id: nanoid(), type: "note", title: "Needs sea view + parking", actor: "Chris", target: "Soho Lofts", at: "Mon" }
  ],
  budgets: [
    { id: nanoid(), label: "Q2 Marketing", amount: 12000, category: "Marketing", status: "Planned" },
    { id: nanoid(), label: "Staging Villa Azure", amount: 5500, category: "Staging", status: "Committed" }
  ],
  events: [
    { id: nanoid(), name: "Broker Open House", date: today.toISOString().slice(0, 10), location: "Palm Jumeirah", partner: "Luxury Co." }
  ],
  addDeal: (input) => set((state) => ({ deals: [...state.deals, { ...input, id: nanoid() }] })),
  moveDeal: (id, stage) => set((state) => ({ deals: state.deals.map((d) => (d.id === id ? { ...d, stage } : d)) })),
  addActivity: (input) => set((state) => ({ activities: [{ ...input, id: nanoid() }, ...state.activities] })),
  addBudget: (input) => set((state) => ({ budgets: [...state.budgets, { ...input, id: nanoid() }] })),
  addEvent: (input) => set((state) => ({ events: [...state.events, { ...input, id: nanoid() }] }))
}));
