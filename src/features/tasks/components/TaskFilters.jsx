function TaskFilters({ filters, onStatusChange, onPriorityChange, onQueryChange, onClear }) {
  return (
    <section className="card filters">
      <div className="filters-top">
        <h2>Фільтри</h2>
        <button type="button" className="ghost-btn" onClick={onClear}>
          Скинути
        </button>
      </div>

      <div className="filters-grid">
        <label>
          Пошук
          <input
            type="search"
            placeholder="Пошук по назві або опису"
            value={filters.query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </label>

        <label>
          Статус
          <select value={filters.status} onChange={(event) => onStatusChange(event.target.value)}>
            <option value="all">Усі</option>
            <option value="todo">Активні</option>
            <option value="done">Виконані</option>
          </select>
        </label>

        <label>
          Пріоритет
          <select value={filters.priority} onChange={(event) => onPriorityChange(event.target.value)}>
            <option value="all">Усі</option>
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default TaskFilters;
