import React, { ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';

interface StatisticsItemProps {
    icon: ReactElement,
    label: string,
    value: string | number
};

const StyledPaper = styled(Paper)`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 16px;
`;

const StatisticsItem = ({icon, label, value}: StatisticsItemProps) => {
    return (
        <div>
            <StyledPaper>
                <Box>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="h5" align="right">{value}</Typography>
                    <Typography variant="caption" >{label}</Typography>
                </Box>
            </StyledPaper>
        </div>
    )
};

export default StatisticsItem;