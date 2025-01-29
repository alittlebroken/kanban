import './Board.css';
import Column from '../Column/Column';
import useStore from '../../stores/store';

const Board = () => {

    const boards = useStore((state) => state.boards);
    const setSelectedBoard = useStore((state) => state.setSelectedBoard);

    const handleOnDragOver = (e, id) => {
        e.preventDefault();
        setSelectedBoard(id);
    }

    return (
            <main className="boardContainer">
                <h1>My Kanban</h1>
                <div className="boardColumnWrapper">
                    {boards && boards?.map((board) => {
                        return (
                            <Column title={board.title} id={board.id} key={board.id} onDragOver={(e) => handleOnDragOver(e, board.id)} />
                        )
                    })}
                </div>
            </main>
    )

}

export default Board;