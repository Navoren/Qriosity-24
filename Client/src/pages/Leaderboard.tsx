import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from '../common/components/Navbar';

interface User {
    name: string;
    points: number;
}

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<User[]>([]);

    useEffect(() => {
        // Fetch leaderboard data from the server
        fetch('http://localhost:3500/leaderboard')
            .then(response => response.json())
            .then(data => setLeaderboard(data))
            .catch(error => console.error('Error fetching leaderboard:', error));
    }, []);

    return (
        <div className='leaderboard-container bg-cover bg-center h-screen p-4' style={{backgroundImage: 'url("../../public/portalbgdark.jpg")'}}>
            <Navbar />
            <AnimatePresence mode='wait'>
            <h2 className="text-3xl font-semibold text-white mb-4 mt-8">Chart</h2>
        <div className="h-full w-full bg-white-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100 p-4">
            
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-center text-gray-300 py-2 px-4 border-b">Rank</th>
                        <th className="text-center text-gray-300 py-2 px-4 border-b">Username</th>
                        <th className="text-center text-gray-300 py-2 px-4 border-b">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((user, index) => (
                        <tr key={index}>
                            <td className="text-white py-2 px-4 border-b">
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                            </td>
                            <td className="text-white py-2 px-4 border-b">{user.name}</td>
                            <td className="text-white py-2 px-4 border-b">{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                </div>
                </AnimatePresence>
            </div>
            );
            
}

export default Leaderboard;
