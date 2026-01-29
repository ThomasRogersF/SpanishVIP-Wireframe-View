import React from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';

const TableBlock = ({ heading, headers, rows }) => {
  return (
    <Box 
      sx={{ 
        bgcolor: '#FFFFFF', 
        borderRadius: '12px', 
        p: 2.5, 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' 
      }}
    >
      {heading && (
        <Typography 
          variant="h3" 
          component="h3" 
          sx={{ 
            fontFamily: 'Lexend', 
            fontSize: { xs: '18px', sm: '20px' }, 
            fontWeight: 600, 
            color: '#1F2937', 
            mb: 1.5 
          }}
        >
          {heading}
        </Typography>
      )}
      <TableContainer
        sx={{
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          overflowX: 'auto',
          width: '100%'
        }}
      >
        <Table size="small" aria-label={heading || "Data table"}>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell 
                  key={index}
                  sx={{ 
                    bgcolor: '#F9FAFB', 
                    fontWeight: 600, 
                    fontSize: '14px', 
                    color: '#374151', 
                    borderBottom: '2px solid #E5E7EB' 
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell 
                    key={cellIndex}
                    sx={{ 
                      fontSize: '15px', 
                      color: cellIndex === 0 ? '#1F2937' : '#6B7280', 
                      fontWeight: cellIndex === 0 ? 500 : 400,
                      borderBottom: rowIndex !== rows.length - 1 ? '1px solid #F3F4F6' : 'none' 
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableBlock;
