import React, { Component } from "react";
import BuildControls from "../../componenets/Burger/BuildControls/BuildControls";
import Burger from "../../componenets/Burger/Burger";
import OrderSummary from "../../componenets/Burger/OrderSummary/OrderSummary";
import Backdrop from "../../componenets/UI/Backdrop/Backdrop";
import Modal from "../../componenets/UI/Modal/Modal";
import axios from "../../axios-orders";
import Spinner from "../../componenets/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 1.3,
  bacon: 0.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://react-burger-21aff-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }
  updatePurchaseHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    let updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseHandler(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }

    let updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const priceReduce = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceReduce;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseHandler(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseOrder = () => {
    this.setState({
      loading: true,
    });
    //SEND to Firebase
    const data = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Arda Kurt",
        email: "to.arda.kurt@gmail.com",
        address: {
          street: "Highbury & Islington",
          zipCode: "N5",
        },
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", data)
      .then((response) => {
        this.setState({
          loading: false,
          purchasing: false,
        });
        console.log(response);
      })
      .catch((error) => {
        this.setState({
          loading: false,
          purchasing: false,
        });
        console.log(error);
      });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };

    //Return True or False from Ingredients
    //Return false for <= 0 -->> disableInfo[key] <= 0
    //Disable - Button
    //{salad: ture, meat: false} like that

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          cancelOrder={this.purchaseCancelHandler}
          purchaseOrder={this.purchaseOrder}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded. </p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientsAdded={this.addIngredientHandler}
            ingredientsRemove={this.removeIngredientHandler}
            purchasable={this.state.purchasable}
            disabled={disableInfo}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </>
      );
    }

    return (
      <>
        <Backdrop
          show={this.state.purchasing}
          clicked={this.purchaseCancelHandler}
        />
        <Modal show={this.state.purchasing}>{orderSummary}</Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
