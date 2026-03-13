import { ActivityPanel, KanbanBoard, MetricCards, PipelineWidget, QuickAdd, Timeline } from "../components/dashboard";
import { QuickActions } from "../components/quick-actions";

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Real Estate Workspace</p>
          <h1 className="text-3xl font-semibold text-white">Deals, Budgets & Events</h1>
          <p className="text-slate-400">ClickUp-inspired control center tailored for property sales.</p>
        </div>
        <QuickActions />
      </header>

      <MetricCards />

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <PipelineWidget />
          <KanbanBoard />
        </div>
        <div className="space-y-6">
          <Timeline />
          <ActivityPanel />
        </div>
      </section>

      <QuickAdd />
    </main>
  );
}
