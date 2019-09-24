import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { default as ApolloClient } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./App.scss";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { CartProvider } from "./components/products/CartContext";
import "./components/iconsLibrary";
import ScrollToTop from "./components/ScrollToTopController";
import ReactNotification from "react-notifications-component";
import "./components/aos";
import "animate.css";
import "react-notifications-component/dist/theme.css";
import Loading from "./components/layouts/Loading";

const Index = lazy(() => import("./components/layouts/Index"));
const About = lazy(() => import("./components/layouts/About"));
const Contact = lazy(() => import("./components/layouts/Contact"));
const OrderPage = lazy(() => import("./components/layouts/Order"));

function App() {
  const client = new ApolloClient({
    uri: "/graphql" //This is the default by the way
  });

  return (
    <BrowserRouter>
      <ScrollToTop>
        <ApolloProvider client={client}>
          <Suspense fallback={<Loading fullscreen={true} />}>
            <CartProvider>
              <ReactNotification />
              <Navbar />
              <Switch>
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/order" component={OrderPage} />
                <Route path="/" component={Index} />
              </Switch>
            </CartProvider>
          </Suspense>
        </ApolloProvider>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
