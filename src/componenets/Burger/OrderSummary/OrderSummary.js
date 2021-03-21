import Ract, {Component} from 'react';
import Button from "../../UI/Button/Button";


class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('ORDER SUMMARY WILLUPDATE')
    }


    render() {
        const ingSum = this.props.ingredients;

        const ingredientSummary = Object.keys(ingSum).map((ingName, i) => (
            <li style={{ textTransform: "capitalize" }} key={ingName + i}>
                {ingName} : {this.props.ingredients[ingName]}
            </li>
        ));
        return(
            <>
                <h2>Order Summary</h2>
                <p>Your Order with following ingredients</p>
                <ul>{ingredientSummary}</ul>
                <p>Total Price: £{this.props.price.toFixed(2)}</p>
                <p>Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelOrder}>
                    Cancel
                </Button>
                <Button btnType="Success" clicked={this.props.purchaseOrder}>
                    Order
                </Button>
            </>
        )
    }
}


export default OrderSummary;
