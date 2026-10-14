import { useState } from "react";

type User = {
    id: number;
    name: string;
    age: number;
    occupation: string;
};

type DataTableProps = {
    tableHeaders: string[];
    users: User[];
    usersPerPage: number;
}

export function DataTable({ tableHeaders, users, usersPerPage }: DataTableProps) {
    const [numUsersPerPage, setNumUsersPerPage] = useState(usersPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(users.length / numUsersPerPage);
    const startIndex = (currentPage - 1) * numUsersPerPage;
    const usersToDisplay = users.slice(startIndex, startIndex + numUsersPerPage);

    return (
        <div>
            <ul>
                {[5, 10, 20].map((num) => (
                    <li key={num}>
                        <button type="button" onClick={() => {setNumUsersPerPage(num); setCurrentPage(1)}}>
                            {num} users per page
                        </button>
                    </li>
                ))}
            </ul>
            <table>
                <thead>
                    <tr>
                        <tbody>
                            {tableHeaders.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tbody>
                    </tr>
                </thead>
                {
                    usersToDisplay.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.occupation}</td>
                        </tr>
                    ))
                }
            </table>
            <button type="button" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                Prev
            </button>
            <button type="button" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                Next
            </button>
        </div>
    );

}

/**
 * table with id, name, age, occupation
 * prev and next buttons
 * useState - number of users per page - 5 - 10 - 20, currentPage, numberOfUsersToDisplay
 * app passes in the table headers and the user data as props
 */