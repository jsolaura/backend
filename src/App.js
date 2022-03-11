import './App.css';
import Header from "components/Header";
import Router from "components/Router";
import Footer from "components/Footer";

import {
    BrowserRouter
} from "react-router-dom";

document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "crossCookie=bar; SameSite=None; Secure";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header />
            <Router />
            <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
