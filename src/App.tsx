import React from "react";
import routes from "./routes";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TopNav from "./components/organisms/Header";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./pages/login/Login";
import PrivateRoute from "./ProtectedRoute";
import SignUpPage from "./pages/signup/SignUp";

function App() {
  return (
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
  );
}

export default App;
