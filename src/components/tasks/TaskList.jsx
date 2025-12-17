import { useState, useMemo } from "react";
import Spinner from 'react-bootstrap/Spinner';
import TaskItem from "./TaskItem.jsx";
import NewTaskForm from "./NewTaskForm.jsx";
import { useTasks } from "../../hooks/useTasks.js";

/**
 * TaskList (Day 4):
 *  - Uses the custom useTasks hook for all Supabase interactions.
 *  - Manages filter state (All / Active / Completed).
 *  - Delegates add / toggle / delete actions to the hook.
 *  - Displays loading, error and summary information.
 */
function TaskList() {
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"

  const { 
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask
  } = useTasks();

  /**
   * Adds a new task by inserting it into Supabase and updating local state.
   *
   * @param {string} title - Title of the new task.
   */
  const handleAddTask = async (title) => {
    addTask(title);
  };

  /**
   * Toggles the is_complete flag of a task both in Supabase and local state.
   *
   * @param {number} id - Task ID.
   * @param {boolean} isComplete - Desired completion state.
   */
  const handleToggleComplete = async (id, isComplete) => {
    toggleTask(id, isComplete);
  };

  /**
   * Deletes a task by id from Supabase and local state.
   *
   * @param {number} id - Task ID.
   */
  const handleDeleteTask = async (id) => {
    deleteTask(id);
  };

  // Derived summary information based on current tasks.
  // useMemo is for values
  // useCallback is for functions
  const totalTasks = useMemo(() => tasks.length, [tasks]);
  const completedTasks = useMemo(() => tasks.filter((task) => task.is_complete).length, [tasks]);

  // Derived filtered list based on current filter state.
  const visibleTasks = useMemo(() => tasks.filter((task) => {
    if (filter === "active") return !task.is_complete;
    if (filter === "completed") return task.is_complete;
    return true;
  }), [tasks, filter]);

  return (
    <section className="card">
      <h2 className="color-white">Tasks</h2>

      <NewTaskForm onAddTask={handleAddTask} />

      {/* Filter controls */}
      <div style={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>
        <span style={{ marginRight: "0.5rem" }}>Filter:</span>
        <button
          type="button"
          onClick={() => setFilter("all")}
          style={{
            marginRight: "0.25rem",
            fontWeight: filter === "all" ? "600" : "400"
          }}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter("active")}
          style={{
            marginRight: "0.25rem",
            fontWeight: filter === "active" ? "600" : "400"
          }}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setFilter("completed")}
          style={{
            fontWeight: filter === "completed" ? "600" : "400"
          }}
        >
          Completed
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {!loading && !error && tasks.length === 0 && <p>No tasks yet.</p>}

      {totalTasks > 0 && (
        <p className="task-summary">
          <strong>{totalTasks}</strong> tasks ·{" "}
          <strong>{completedTasks}</strong> completed
        </p>
      )}
      
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default TaskList;
