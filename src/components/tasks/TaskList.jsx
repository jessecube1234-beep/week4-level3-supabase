import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem.jsx";


/**
 * TaskList is responsible for:
 *  - Fetching tasks from Supabase on mount.
 *  - Managing loading and error state for the list.
 *  - Rendering a list of TaskItem components.
 */
function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Loads tasks from the Supabase "tasks" table.
   */
  const loadTasks = async () => {
    // Set loading and errors
    setLoading(true);
    setError(null);

    const { data, error: queryError } = await supabase
      .from('tasks')
      .select('*')
      .order("created_at", { ascending: false });

    if (queryError) {
      setError('Error loading tasks: ' + queryError.message);
    } else {
      setTasks(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      await loadTasks();
    };

    fetchTasks();
  }, []);

  return (
    <section className="card">
      <h2>Tasks</h2>

      {loading && <p>Loading tasks…</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && tasks.length === 0 && <p>No tasks yet.</p>}

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
};

export default TaskList;