import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      await addTask(title.trim());
      setTitle("");
    } catch {
      setError("Could not add task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <label htmlFor="assignment-task-title" className="sr-only">
        Task title
      </label>

      <input
        id="assignment-task-title"
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={submitting}
      />

      <button
        type="submit"
        disabled={submitting || !title.trim()}
      >
        {submitting ? "Adding..." : "Add"}
      </button>

      {error && <p className="error-text">{error}</p>}
    </form>
  );
}

