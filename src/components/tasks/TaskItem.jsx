/**
 * Displays a single task as a list item.
 * Displays a single task as a list item (read-only on Day 2).
 *
 * @param {object} props
 * @param {{ id: number, title: string, is_complete: boolean }} props.task
 * @param {{ id: number, title: string, is_complete: boolean, inserted_at?: string }} props.task
 * @param {(id: number) => void} props.onToggleComplete
 * @param {(id: number) => void} props.onDelete
 */
export default function TaskItem({ task, onToggleComplete, onDelete }) {
  /**
   * Handles checkbox changes and notifies the parent component.
   */
  const handleToggle = () => {
    onToggleComplete(task.id, !task.is_complete);
  };

  /**
   * Handles delete button clicks and notifies the parent component.
   */
  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <li className="task-item">
      <label className="task-item__content">
        <input
          type="checkbox"
          checked={task.is_complete}
          onChange={handleToggle}
        />
        <span
          className={
            task.is_complete
              ? "task-item__title task-item__title--done"
              : "task-item__title"
          }
        >
          {task.title}
        </span>
      </label>
      <button
        type="button"
        className="task-item__delete"
        onClick={handleDelete}
        aria-label="Delete task"
      >
        ✕
      </button>
    </li>
  );
}
