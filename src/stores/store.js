import { create } from "zustand";
import zukeeper from 'zukeeper';
import { persist } from "zustand/middleware";
import { v4 as uuid} from 'uuid';

const useStore = create(persist(
    (set, get) => ({
        boards: [
            { id: uuid(), title: 'Pending', description: '', color: ''},
            { id: uuid(), title: 'In Progress', description: '', color: ''},
            { id: uuid(), title: 'Completed', description: '', color: ''}
        ],
        tasks: [],
        selectedTask: '',
        selectedBoard: '',
        addTask: (title, description = '', boardId, dueDate = '', priority = false) => {
            set((state) => ({tasks: [...state.tasks, { id: uuid(), title, description, board: boardId, dueDate, priority }]}))
        },
        removeTask: (id) => {
            set((state) => (
                { tasks: [...state.tasks.filter(task => task.id !== id)]}
            ))
        },
        updateTask: (id, title, description, boardId, dueDate, priority) => {
            set((state) => ({
             tasks: [...state.tasks.map(task => {
                if(task.id !== id){
                    return task
                } else {
                   let newTask = {
                    id, title, description, board: boardId, dueDate, priority
                   }
                    return newTask;
                }
             })]
            }));
            
        },
        moveTask: (taskId, boardId) => {
            set(
                (state) => ({
                    tasks: [...state.tasks.map(task => {
                        if(task.id === taskId){
                            return {
                                ...task, board: boardId
                            }
                        } else {
                            return task
                        }
                    })]
                })
            )
        }
        ,
        setSelectedTask: (id) => {
            set(
                (state) => ({
                    selectedTask: id
                })
            )
        },
        setSelectedBoard: (id) => {
            set(
                (state) => ({
                    selectedBoard: id
                })
            )
        }
    })
), { name: 'kanbanStore'});

window.store = useStore;
export default useStore;