function TaskStats({ stats }) {
  const items = [
    { label: 'Усього', value: stats.total },
    { label: 'Активні', value: stats.active },
    { label: 'Виконані', value: stats.completed },
    { label: 'Високий пріоритет', value: stats.highPriority },
  ];

  return (
    <section className="stats-grid">
      {items.map((item) => (
        <article key={item.label} className="card stat-card">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </section>
  );
}

export default TaskStats;
