import { useState } from 'react'

type GridProps = {
    cols: number;
    rows: number;
}

export default function Spreadsheet({cols, rows}: GridProps) {
    const [grid, setGrid] = useState<string[][]>(Array.from({length: rows}, () => Array.from({length: cols}, () => '')));
    const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);

    function setNewGrid(newVal: string, rowIndex: number, colIndex: number) {
        const newGrid = grid.map((r, rIndex) => rIndex === rowIndex ? r.map((c, cIndex) => cIndex === colIndex ? newVal :c) : r);
        setGrid(newGrid);                                    
    }

    function displayCell(cell: string, rowIndex: number, colIndex: number) {
        console.log(`cell: ${cell} , row: ${rowIndex}, col: ${colIndex}`);
        if (cell.startsWith('=') && cell.length > 2 ) {
            const columnLetter = cell[1];
            const cIndex = columnLetter.charCodeAt(0) - 65; // Convert letter to index (A=0, B=1, ...)
            const rIndex = parseInt(cell.slice(2)) - 1; // Convert row number to index (1=0, 2=1, ...)
            const referencedCellValue = grid[rIndex][cIndex];
            return referencedCellValue;
        } else {
            return cell;
        }
    }
    return (
        <div>
            <table className="spreadsheet-grid">
                <thead>
                    <tr>
                        <th aria-hidden="true"></th>
                        {Array.from({length: cols}, (_, colIndex) => (
                            <th key={colIndex} scope="col">{String.fromCharCode(65 + colIndex)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {grid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <th scope="row">{rowIndex + 1}</th>
                            {row.map((cell, colIndex) => (
                                <td
                                    key={`${rowIndex}-${colIndex}`}
                                    className={selectedCell?.row === rowIndex && selectedCell.col === colIndex ? 'selected' : undefined}
                                    onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                                >
                                    <input type="text" value={selectedCell?.row === rowIndex && selectedCell.col === colIndex ? cell : displayCell(cell, rowIndex, colIndex)} onChange={(e) => {
                                       setNewGrid(e.target.value, rowIndex, colIndex);
                                    }}/>                                     
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


/**
 * pass in cols and rows,
 * useState for saving Grid
 * useState when cell is selected
 */