import { useShallow } from 'zustand/shallow';
import useStore from '../../stores/store';
import './Task.css';

const Task = ({ task, onHandleDragStart, onHandleDragOver, onUpdateClick }) => {

    const thisTask = useStore(useShallow((store) => store.tasks.filter(item => item.id === task.id)));
    const removeTask = useStore((store) => store.removeTask);

    return (
        <div 
            className="taskItemWrapper" 
            draggable 
            onDragStart={() => {onHandleDragStart(task.id)}}
            onDragOver={(e) => {onHandleDragOver(e, task.id)}}
        >
            <div className="taskTitleWrapper">
                {task.priority && (<span className="material-symbols-outlined taskPriority " >priority_high</span>)}
                {task.title}
            </div>
            <div className="taskInfoWrapper">
                <span className="material-symbols-outlined taskDelete " onClick={(e) => onUpdateClick(e, thisTask[0])} >
                    edit
                </span>
                <span className="material-symbols-outlined taskDelete" onClick={() => removeTask(task.id)}>
                    delete
                </span>
            </div>
        </div>
    )

};

export default Task;