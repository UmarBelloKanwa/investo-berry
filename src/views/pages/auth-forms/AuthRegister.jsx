import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';


import countries from "../../../store/countriesList";
import useAuthRegister from '../../../hooks/auth/useAuthRegister';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| JWT - REGISTER ||=========================== //

export default function AuthRegister() {
  const { registerData, handleSetRegisterData } = useAuthRegister();

  const { fullName,
    email,
    country,
    phoneNumber,
    password,
    confirmPassword } = registerData.data;
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }} size={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <TextField
        fullWidth
        label="Full name"
        name="fullName"
        type="text"
        value={fullName}
        onChange={(e) => handleSetRegisterData("fullName", e.target.value)}
        error={!!registerData.helperText.fullName}
        helperText={registerData.helperText.fullName}
        sx={{ ...theme.typography.customInput }}
      />

      <TextField
        fullWidth
        label="Email address"
        name="email"
        type="email"
        value={email}
        onChange={(e) => handleSetRegisterData("email", e.target.value)}
        error={!!registerData.helperText.email}
        helperText={registerData.helperText.email}
        sx={{ ...theme.typography.customInput }}
      />

      <FormControl fullWidth >
        <Autocomplete
          onChange={(e, v) => handleSetRegisterData("country", v)}
          id="country-select-demo"
          value={country}
          options={countries}
          sx={{ ...theme.typography.customInput }}
          autoHighlight
          getOptionLabel={(option) => option?.label || ""}
          isOptionEqualToValue={(option, value) => option.code === value?.code}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                {option.label}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Country'
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                },
              }}
            />
          )}
        />
        {registerData.helperText.country && (
          <Typography variant="caption" color="error">
            {registerData.helperText.country}
          </Typography>
        )}
      </FormControl >

      <TextField
        fullWidth
        label="Phone Number"
        name="phone"
        type="tel"
        value={phoneNumber}
        onChange={(e) => handleSetRegisterData("phoneNumber", e.target.value)}
        error={!!registerData.helperText.phoneNumber}
        helperText={registerData.helperText.phoneNumber}
        sx={{ ...theme.typography.customInput }}
      />

      <TextField
        fullWidth
        label="Password"
        id="outlined-adornment-password-register"
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => handleSetRegisterData("password", e.target.value)}
        value={password}
        name="password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="large"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        error={!!registerData.helperText.password}
        helperText={registerData.helperText.password}
        sx={{ ...theme.typography.customInput }}
      />

      <TextField
        fullWidth
        id="outlined-adornment-password-register"
        type={showPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={(e) => handleSetRegisterData("confirmPassword", e.target.value)}
        name="password"
        label="Confirm Password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="large"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        error={!!registerData.helperText.confirmPassword}
        helperText={registerData.helperText.confirmPassword}
        sx={{ ...theme.typography.customInput }}
      />

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label={
              <Typography variant="subtitle1">
                Agree with &nbsp;
                <Typography variant="subtitle1" component={Link} to="#">
                  Terms & Condition.
                </Typography>
              </Typography>
            }
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
            Sign up
          </Button>
        </AnimateButton>
      </Box>
    </>
  );
}
