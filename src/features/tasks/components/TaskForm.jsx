import { useState } from 'react';

const initialForm = {
  title: '',
  description: '',
  priority: 'medium',
};

function TaskForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
    });

    setFormData(initialForm);
  };

  return (
    <form className="card task-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Додати нову задачу</h2>
        <p>Форма вже готова до майбутньої інтеграції з бекендом через thunk.</p>
      </div>

      <label>
        Назва
        <input
          name="title"
          placeholder="Наприклад: Підготувати презентацію"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Опис
        <textarea
          name="description"
          placeholder="Короткий опис задачі"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Пріоритет
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
      </label>

      <button type="submit" className="primary-btn" disabled={isLoading}>
        {isLoading ? 'Збереження...' : 'Додати задачу'}
      </button>
    </form>
  );
}

export default TaskForm;
