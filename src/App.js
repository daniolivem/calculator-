import './App.css';
import Calculator from './components/Calculator';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Calculator />
      </div>
    </ThemeProvider>
  );
}

export default App;
