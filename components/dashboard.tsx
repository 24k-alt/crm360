"use client";

import { useState } from "react";
import { useCRMStore, Deal, BudgetItem, EventCollab, Activity } from "../lib/store";
import { ArrowUpRight, Sparkles, TrendingUp, Users, Mail, Phone, MessageSquare, CalendarClock, Wallet, Plus, Move } from "lucide-react";
import clsx from "clsx";

const stageOrder: Deal["stage"][] = ["New Lead", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

const iconMap: Record<Activity["type"], JSX.Element> = {
  call: <Phone className="w-4 h-4 text-mint" />,
  email: <Mail className="w-4 h-4 text-lilac" />,
  note: <MessageSquare className="w-4 h-4 text-blush" />,
  task: <Sparkles className="w-4 h-4 text-emerald-300" />,
  event: <CalendarClock className="w-4 h-4 text-cyan-300" />
};

export function MetricCards() {
  const deals = useCRMStore((s) => s.deals);
  const pipeline = deals.reduce((sum, d) => sum + (d.stage !== "Lost" ? d.value : 0), 0);
  const won = deals.filter((d) => d.stage === "Won").length;
  const leads = deals.length;
  const metrics = [
    { label: "Pipeline", value: `$${pipeline.toLocaleString()}`, delta: "+6.2%", icon: TrendingUp, color: "from-mint to-lilac" },
    { label: "Won Deals", value: won, delta: "↑", icon: Sparkles, color: "from-lilac to-blush" },
    { label: "Active Leads", value: leads, delta: "+" + leads, icon: Users, color: "from-cyan-400 to-mint" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="glass p-4 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">{m.label}</p>
            <p className="text-2xl font-semibold text-white">{m.value}</p>
            <p className="text-emerald-400 text-sm">{m.delta}</p>
          </div>
          <div className={clsx("p-3 rounded-xl bg-gradient-to-br", m.color)}>
            <m.icon className="w-6 h-6 text-slate-900" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PipelineWidget() {
  const deals = useCRMStore((s) => s.deals.slice(0, 3));
  return (
    <div className="glass p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Pipeline Snapshot</p>
          <h3 className="text-lg font-semibold">Real Estate Deals</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-300">
        {deals.map((deal) => (
          <div key={deal.id} className="glass p-3 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-white">{deal.title}</p>
              <span className="text-xs text-slate-400">{deal.stage}</span>
            </div>
            <p className="text-slate-300">Property: {deal.property}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-mint">${deal.value.toLocaleString()}</span>
              <span className="text-slate-400">Score {deal.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function KanbanBoard() {
  const deals = useCRMStore((s) => s.deals);
  const moveDeal = useCRMStore((s) => s.moveDeal);

  return (
    <div className="glass p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Deals Board</h3>
        <span className="text-sm text-slate-400">Drag to move stage</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 text-sm">
        {stageOrder.map((stage) => {
          const cards = deals.filter((d) => d.stage === stage);
          return (
            <div key={stage} className="glass p-3 space-y-2 min-h-[180px]">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{stage}</span>
                <span>{cards.length}</span>
              </div>
              <div className="space-y-2">
                {cards.map((c) => (
                  <div key={c.id} className="bg-white/5 rounded-lg p-2 text-white border border-white/10">
                    <p className="font-medium">{c.title}</p>
                    <p className="text-xs text-slate-400">{c.property}</p>
                    <div className="flex items-center justify-between text-[11px] mt-1">
                      <span className="text-mint">${c.value.toLocaleString()}</span>
                      <button
                        className="text-slate-300 inline-flex items-center gap-1"
                        onClick={() => {
                          const idx = stageOrder.indexOf(c.stage);
                          const next = stageOrder[Math.min(stageOrder.length - 1, idx + 1)];
                          moveDeal(c.id, next);
                        }}
                      >
                        <Move className="w-3 h-3" /> next
                      </button>
                    </div>
                  </div>
                ))}
                {cards.length === 0 && <p className="text-xs text-slate-500">Drop deals here</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Timeline() {
  const activities = useCRMStore((s) => s.activities);
  return (
    <div className="glass p-4 space-y-3">
      <h3 className="text-lg font-semibold">Timeline</h3>
      <div className="space-y-3">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white/5">{iconMap[item.type]}</div>
            <div>
              <p className="text-white font-medium">{item.title}</p>
              <p className="text-xs text-slate-400">{item.actor} • {item.at} • {item.target}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActivityPanel() {
  const budgets = useCRMStore((s) => s.budgets);
  const events = useCRMStore((s) => s.events);
  return (
    <div className="glass p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Budget & Events</h3>
        <ArrowUpRight className="w-4 h-4 text-slate-400" />
      </div>
      <div className="space-y-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-slate-200">
          <p className="font-semibold flex items-center gap-2"><Wallet className="w-4 h-4" /> Budgets</p>
          <ul className="mt-2 space-y-1 text-slate-300">
            {budgets.map((b) => (
              <li key={b.id} className="flex justify-between">
                <span>{b.label} • {b.category}</span>
                <span className="text-mint">${b.amount.toLocaleString()} ({b.status})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-slate-200">
          <p className="font-semibold flex items-center gap-2"><CalendarClock className="w-4 h-4" /> Events & Collabs</p>
          <ul className="mt-2 space-y-1 text-slate-300">
            {events.map((e) => (
              <li key={e.id} className="flex justify-between">
                <span>{e.name} • {e.location}</span>
                <span className="text-slate-400">{e.date} • {e.partner}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function QuickAdd() {
  const addDeal = useCRMStore((s) => s.addDeal);
  const addActivity = useCRMStore((s) => s.addActivity);
  const addBudget = useCRMStore((s) => s.addBudget);
  const addEvent = useCRMStore((s) => s.addEvent);
  const [deal, setDeal] = useState({ title: "", property: "", value: 0, owner: "", score: 60 });
  const [activity, setActivity] = useState({ title: "", target: "", type: "call" as Activity["type"] });
  const [budget, setBudget] = useState({ label: "", amount: 0, category: "Marketing" as BudgetItem["category"], status: "Planned" as BudgetItem["status"] });
  const [event, setEvent] = useState({ name: "", date: "", location: "", partner: "" });

  return (
    <div className="glass p-4 space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> Quick capture</h3>

      <div className="space-y-2">
        <p className="text-sm text-slate-300">New Deal</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <input className="input" placeholder="Title" value={deal.title} onChange={(e) => setDeal({ ...deal, title: e.target.value })} />
          <input className="input" placeholder="Property" value={deal.property} onChange={(e) => setDeal({ ...deal, property: e.target.value })} />
          <input className="input" placeholder="Value" type="number" value={deal.value} onChange={(e) => setDeal({ ...deal, value: Number(e.target.value) })} />
          <input className="input" placeholder="Owner" value={deal.owner} onChange={(e) => setDeal({ ...deal, owner: e.target.value })} />
        </div>
        <button
          className="btn"
          onClick={() => {
            if (!deal.title) return;
            addDeal({ ...deal, stage: "New Lead", closeDate: undefined } as Deal);
            setDeal({ title: "", property: "", value: 0, owner: "", score: 60 });
          }}
        >
          Save deal
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-slate-300">Activity</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <input className="input" placeholder="Title" value={activity.title} onChange={(e) => setActivity({ ...activity, title: e.target.value })} />
          <input className="input" placeholder="Target" value={activity.target} onChange={(e) => setActivity({ ...activity, target: e.target.value })} />
          <select className="input" value={activity.type} onChange={(e) => setActivity({ ...activity, type: e.target.value as Activity["type"] })}>
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="note">Note</option>
            <option value="event">Event</option>
            <option value="task">Task</option>
          </select>
        </div>
        <button
          className="btn"
          onClick={() => {
            if (!activity.title) return;
            addActivity({ ...activity, actor: "You", at: "Just now" });
            setActivity({ title: "", target: "", type: "call" });
          }}
        >
          Log activity
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-slate-300">Budget item</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <input className="input" placeholder="Label" value={budget.label} onChange={(e) => setBudget({ ...budget, label: e.target.value })} />
          <input className="input" type="number" placeholder="Amount" value={budget.amount} onChange={(e) => setBudget({ ...budget, amount: Number(e.target.value) })} />
          <select className="input" value={budget.category} onChange={(e) => setBudget({ ...budget, category: e.target.value as BudgetItem["category"] })}>
            <option>Marketing</option>
            <option>Renovation</option>
            <option>Staging</option>
            <option>Commission</option>
            <option>Misc</option>
          </select>
          <select className="input" value={budget.status} onChange={(e) => setBudget({ ...budget, status: e.target.value as BudgetItem["status"] })}>
            <option>Planned</option>
            <option>Committed</option>
            <option>Spent</option>
          </select>
        </div>
        <button
          className="btn"
          onClick={() => {
            if (!budget.label) return;
            addBudget(budget as BudgetItem);
            setBudget({ label: "", amount: 0, category: "Marketing", status: "Planned" });
          }}
        >
          Save budget
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-slate-300">Event / Collab</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <input className="input" placeholder="Name" value={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} />
          <input className="input" type="date" value={event.date} onChange={(e) => setEvent({ ...event, date: e.target.value })} />
          <input className="input" placeholder="Location" value={event.location} onChange={(e) => setEvent({ ...event, location: e.target.value })} />
          <input className="input" placeholder="Partner" value={event.partner} onChange={(e) => setEvent({ ...event, partner: e.target.value })} />
        </div>
        <button
          className="btn"
          onClick={() => {
            if (!event.name) return;
            addEvent(event as EventCollab);
            setEvent({ name: "", date: "", location: "", partner: "" });
          }}
        >
          Save event
        </button>
      </div>
    </div>
  );
}
