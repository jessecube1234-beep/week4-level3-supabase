import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem.jsx";
import NewTaskForm from "./NewTaskForm.jsx";

/**
 * TaskList component
 */
function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"

    /**
     * Loads tasks from the Supabase "tasks" table.
     */
    const loadTasks = async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            setError("Failed to load tasks.");
            console.error(error);
        } else {
            setTasks(data || []);
        }

        setLoading(false);
    };

    /**
     * Adds a new task by inserting it into Supabase and updating local state.
     *
     * @param {string} title - Title of the new task.
     */
    const handleAddTask = async (title) => {
        const { data, error } = await supabase
            .from("tasks")
            .insert([{ title }])
            .select();

        if (error) {
            // Re-throw so NewTaskForm can display the error.
            throw error;
        }

        const insertedTask = data?.[0];
        if (insertedTask) {
            // Prepend the new task to the existing list.
            setTasks((prev) => [insertedTask, ...prev]);
        }
    };

    /**
     * Toggles the is_complete flag of a task both in Supabase and local state.
     *
     * @param {number} id - Task ID.
     * @param {boolean} isComplete - Desired completion state.
     */
    const handleToggleComplete = async (id, isComplete) => {
        const { error } = await supabase
            .from("tasks")
            .update({ is_complete: isComplete })
            .eq("id", id);

        if (error) {
            console.error(error);
            alert("Failed to update task.");
            return;
        }

        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, is_complete: isComplete } : task
            )
        );
    };

    /**
     * Deletes a task by id from Supabase and local state.
     *
     * @param {number} id - Task ID.
     */
    const handleDeleteTask = async (id) => {
        const confirmDelete = window.confirm("Delete this task?");
        if (!confirmDelete) return;

        const { error } = await supabase.from("tasks").delete().eq("id", id);

        if (error) {
            console.error(error);
            alert("Failed to delete task.");
            return;
        }

        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    useEffect(() => {
        const fetchTasks = async () => {
            await loadTasks();
        };

        fetchTasks();
    }, []);

    // Derived summary information based on current tasks.
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.is_complete).length;

    // Derived filtered list based on current filter state.
    const visibleTasks = tasks.filter((task) => {
        if (filter === "active") return !task.is_complete;
        if (filter === "completed") return task.is_complete;
        return true;
    });

    return (
        <section className="card">
            <h2>Tasks</h2>

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

            {loading && <p>Loading tasks…</p>}
            {error && <p className="error-text">{error}</p>}

            {!loading && !error && tasks.length === 0 && <p>No tasks yet.</p>}

            {totalTasks > 0 && (
                <p className="task-summary">
                    <strong>{totalTasks}</strong> tasks ·{" "}
                    <strong>{completedTasks}</strong> completed
                </p>
            )}

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

        </section>
    );
}

export default TaskList;
