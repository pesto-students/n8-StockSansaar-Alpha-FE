import React, { useState } from "react";
import routes from "./routes";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TopNav from "./components/organisms/Header";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./pages/login/Login";
import PrivateRoute from "./ProtectedRoute";
import SignUpPage from "./pages/signup/SignUp";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

function App() {
  const [darkState, setDarkState] = useState(true);
  const palletType = darkState ? "dark" : "light";
  const darkTheme = createTheme({
    palette: {
      type: palletType,
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <TopNav />
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignUpPage} />
              {routes.map((route: any) => (
                <PrivateRoute {...route}></PrivateRoute>
              ))}
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
