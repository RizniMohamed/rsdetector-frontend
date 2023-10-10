import { Box } from '@mui/material'
import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

const Logs = forwardRef((props, ref) => {
    const logBoxRef = useRef(null);
    const [logs, setLogs] = useState([]);


    function getTimestamp() {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
        const year = now.getFullYear();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const timestamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return timestamp;
    }

    useImperativeHandle(ref, () => ({
        log,
    }));

    const log = (message) => {
        setLogs(prevLogs => [...prevLogs, `${getTimestamp()}: ${message}`])
    }

    useEffect(() => {
        if (logBoxRef.current) {
            logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <Box
            ref={logBoxRef}
            sx={{
                border: "1px solid red",
                width: ["100%", 815], 
                height: [400,815],
                overflowY: 'auto',
            }}
        >
            {logs.map((log, index) => (
                <Box key={index} sx={{ whiteSpace: 'nowrap',fontSize:[12,15] }}>{log}</Box>
            ))}
        </Box>
    )
});

export default Logs