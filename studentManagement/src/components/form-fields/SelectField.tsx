import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, useController } from 'react-hook-form';

interface SelectOption {
    label?: string;
    value: string | number;
};

interface SelectFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
    disabled?: boolean;
    options: SelectOption[];
};

const SelectField = ({ name, control, label, disabled, options }: SelectFieldProps) => {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error }
    } = useController({
        name,
        control,
    })

    return (
        <FormControl
            fullWidth
            variant="standard"
            size="small"
            disabled={disabled}
            margin="normal"
            error={invalid}
        >

            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <Select
                labelId={`${name}_label`}
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={onChange}
                onBlur={onBlur}
            >
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>

            <FormHelperText>{error?.message}</FormHelperText>

        </FormControl>
    )
};

export { SelectField };

