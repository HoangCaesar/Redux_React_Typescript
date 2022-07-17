import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)`
    padding: 16px;
    border: 1px solid #d1d1d1;
`;

interface WidgetProps {
    title: string;
    children: any
};

const Widget = ({ title, children }: WidgetProps) => {
    return (
        <StyledPaper>
            <Typography variant="subtitle2">{title}</Typography>

            <Box mt={2}>{children}</Box>
        </StyledPaper>
    )
};

export default Widget;