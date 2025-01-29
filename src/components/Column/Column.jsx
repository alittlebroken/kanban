import './Column.css';
import Task from '../Task/Task';

import useStore from '../../stores/store';
import { useShallow } from 'zustand/shallow';

import Modal from '../Modal/Modal';
import { useState } from 'react';

const Column = ({ title, id }) => {

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [drag, setDrag] = useState(false);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskPriority, setTaskPriority] = useState(false);

    const [editTaskId, setEditTaskId] = useState('')
    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [editTaskDesc, setEditTaskDesc] = useState('');
    const [editTaskBoardId, setEditTaskBoardId] = useState('');
    const [editTaskDueDate, setEditTaskDueDate] = useState('');
    const [editTaskPriority, setEditTaskPriority] = useState('off');

    const tasks = useStore(useShallow((store) => store.tasks.filter((task) => task.board === id)));
    const boards = useStore((store) => store.boards);
    const selectedTask = useStore((store) => store.selectedTask);
    const selectedBoard = useStore((store) => store.selectedBoard);
    const addTask = useStore((store) => store.addTask);
    const moveTask = useStore((store) => store.moveTask);
    const updateTask = useStore((store) => store.updateTask);
    const setSelectedTask = useStore((store) => store.setSelectedTask);
    const setSelectedBoard = useStore((state) => state.setSelectedBoard);

    const showModal = () => {
        setOpen(!open);
    }

    const showEditModal = () => {
        setOpenEdit(!openEdit);
    }

    /* Handle the drag and drop of different tasks */
    const onAllowDrop = (e, id) => {
        e.preventDefault();
        setSelectedBoard(id);
        setDrag(true);
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        setDrag(false);
    }

    const onDrop = (e) => {
        e.preventDefault();
        moveTask(selectedTask, selectedBoard);
        setDrag(false);
    }

    const onTaskDragStart = (id) => {
        setSelectedTask(id);
        console.log(id);
    };

    const onTaskDragOver = (e, taskId, boardId) => {
        e.preventDefault();
        
    }

    const handleEditClick = (e, task) => {
        e.preventDefault();

        /* Set the various state values needed for editing the task */
        setEditTaskId(task.id);
        setEditTaskTitle(task.title);
        setEditTaskDesc(task.description);
        setEditTaskBoardId(task.board);
        setEditTaskDueDate(task.dueDate);
        setEditTaskPriority(task.priority);

        setOpenEdit(true);

    }

    const handleEditSaveClick = (e) => {
        e.preventDefault();

        updateTask(editTaskId, editTaskTitle, editTaskDesc, editTaskBoardId, editTaskDueDate, editTaskPriority);

        setEditTaskId('');
        setEditTaskTitle('');
        setEditTaskDesc('');
        setEditTaskBoardId('');
        setEditTaskDueDate('');
        setEditTaskPriority('');


        setOpenEdit(false);

    };

    return (
        <section className={`columnWrapper ${drag ? "dragged" : " "}`} onDragOver={(e) => onAllowDrop(e, id)} onDrop={onDrop} onDragLeave={onDragLeave}>
            <div className="titleWrapper"><h3>{title}</h3> <button onClick={() => setOpen(!open) }>Add</button></div>
            <div className="taskWrapper">
               {tasks && tasks?.map((task) => {
                    
                    return (
                        <Task 
                            task={task} 
                            key={task.id} 
                            onHandleDragStart={onTaskDragStart}
                            onHandleDragOver={(e) => onTaskDragOver(e, selectedTask, selectedBoard)}
                            onUpdateClick={handleEditClick}
                        />
                    )})
               } 
            </div>
            
            <div className="taskCount">
                Tasks: {tasks?.length}
            </div>

            {/* Modal for creating a new task */}
            <Modal show={open} onClose={showModal} title="Create Task">
                    <div className="newTaskWrapper">
                            <label>
                                Title:
                                <input type="text" name="taskTitle" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                            </label>
                            <label>
                                Description:
                                <input type="text" name="taskTitle" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                            </label>
                            <label>
                                Important:
                                <input type="checkbox" checked={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} />
                            </label>
                            <label>
                                Due Date:
                                <input type="datetime-local" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
                            </label>
                            <button className="createButton" onClick={() => {
                                console.log(taskPriority);
                                addTask(taskTitle, taskDescription, id, taskDueDate, taskPriority);
                                setOpen(false);
                                setTaskTitle('');
                                setTaskDescription('');
                                setTaskDueDate('');
                                setTaskPriority(false);
                            }}>
                                Create Task
                            </button>
                    </div>
            </Modal>

            {/*Modal for editing a task */}
            <Modal show={openEdit} onClose={showEditModal} title="Edit Task">
                
                <div className="editTaskWrapper">
                    <label>
                        id:
                        <input type="text" value={editTaskId} disabled readOnly/>
                    </label>
                    <label>
                        Title:
                        <input type="text" value={editTaskTitle} onChange={(e) => setEditTaskTitle(e.target.value)} />
                    </label>
                    <label>
                        Important:
                        <input type="checkbox" defaultChecked={editTaskPriority} onChange={(e) => setEditTaskPriority(e.target.checked)} />
                     </label>
                    <label>
                        Desc:
                        <input type="text" value={editTaskDesc} onChange={(e) => setEditTaskDesc(e.target.value)} />
                    </label>
                    <label>
                        Board:
                        <select value={editTaskBoardId} onChange={(e) => setEditTaskBoardId(e.target.value)}>
                            {boards.map(board => {
                                return (<option value={board.id} key={board.id}>{board.title}</option>)
                            })}
                        </select>
                    </label>
                    <label>
                        Due Date:
                        <input type="datetime-local" value={editTaskDueDate} onChange={(e) => setEditTaskDueDate(e.target.value)} />
                    </label>
                    <button className="saveButton" onClick={e => handleEditSaveClick(e)}>
                        Save
                    </button>
                </div>
            </Modal>
        </section>
    )

}



export default Column;