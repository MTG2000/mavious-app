import React from "react";
import Products from "../products/Products";
import ProductPage from "../products/ProductPage";
import { Switch, Route } from "react-router-dom";

const Index = () => {
  document.title = "Mavious";

  return (
    <main>
      <Switch>
        <Route exact path="/" component={Products} />
        <Route path="/product/:model" component={ProductPage} />
      </Switch>
    </main>
  );
};

export default Index;
