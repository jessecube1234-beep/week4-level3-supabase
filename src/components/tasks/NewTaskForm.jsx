import { useState } from "react";

/**
 * NewTaskForm lets the user add a new task.
 *
 * @param {object} props
 * @param {(title: string) => Promise<void> | void} props.onAddTask
 *        Callback invoked when the form is submitted with a non-empty title.
 */
const NewTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = title.trim();

    if (!trimmed) {
      setError("Task title cannot be empty.");
      return;
    }

    if (trimmed.length > 80) {
      setError("Task title cannot exceed 80 characters.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await onAddTask(trimmed);
      setTitle('');
    } catch (formError) {
      console.log(formError);
      setError("Failed to add a task. Error message: " + formError?.message);

      setTimeout(() => {
        setError("");
      }, 5000);

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <label htmlFor="task-title" className="sr-only">
        Task title
      </label>

      <input
        id="task-title"
        type="text"
        placeholder="Add a new task…"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={submitting}
      />

      <button type="submit" disabled={submitting || !title.trim()}>
        {submitting ? "Adding…" : "Add"}
      </button>

      {error && <p className="error-text">{error}</p>}
    </form>
  );
};

export default NewTaskForm;