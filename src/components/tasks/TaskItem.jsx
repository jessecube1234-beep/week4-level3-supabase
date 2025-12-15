/**
 * Displays a single task as a list item.
 *
 * @param {object} props
 * @param {{ id: number, title: string, is_complete: boolean }} props.task
 */
export default function TaskItem({ task }) {
  return (
    <li className="task-item">
      <span
        className={
          task.is_complete ? "task-item__title task-item__title--done" : "task-item__title"
        }
      >
        {task.title}
      </span>
    </li>
  );
}
