import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import ShoplyApi from "../api/api";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, setCartItems, currentUser, totalAmount, totalItems } = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const initialOptions = {
   "client-id": "AfBVLM9djpLsUHVucMM1dygLEeRCzucMls_rlkLkbNCF_tQpLblElMcEfwCrXJGfeZyNODX4uSunvIw4",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = async () => {
    try {
      const response = await ShoplyApi.createPayPalOrder({
        cart: cartItems,
        totalAmount: totalAmount,
        totalItems: totalItems,
      })

      const orderData = response;

      if (orderData.jsonResponse.id) {
        return orderData.jsonResponse.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...${error}`);
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await ShoplyApi.capturePayPalOrder(data.orderID);

      const orderData = response;
      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(
          `${errorDetail.description} (${orderData.debug_id})`
        );
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
        );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );

        // Create an order in database

        const shippingInfo = orderData.purchase_units[0].shipping;

        await ShoplyApi.createOrder({
          userId: currentUser.id,
          totalItems,
          totalAmount,
          cartItems,
          name: shippingInfo.name.full_name,
          address: shippingInfo.address.address_line_1,
          city: shippingInfo.address.admin_area_2,
          state: shippingInfo.address.admin_area_1,
          zip: shippingInfo.address.postal_code,
          country: shippingInfo.address.country_code,
        });

        // delete items from cart in database
        await ShoplyApi.removeAllItemsFromCart(currentUser.cartId)
        setCartItems([]);
        
        // navigate to order confirmation page
        navigate('/order-confirmation');
      }
    } catch (error) {
      console.error(error);
      setMessage(
        `Sorry, your transaction could not be processed...${error}`
      );
    }
  };

  

  return (
    <div className="Checkout my-4">
      <PayPalScriptProvider options={initialOptions}>
        <h2 className="text-center mb-4">Checkout</h2>
        {message && <p className="error-message alert alert-danger">{message}</p>}
        <div className="checkout-container card p-4 shadow-sm">
          <div className="checkout-details">
            <p className="mb-4">Items ({totalItems}): <strong>${totalAmount.toFixed(2)}</strong></p>
            <div id="paypal-button-container">
              <PayPalButtons 
                style={{
                  shape: "pill",
                  layout: "vertical",
                  color: "gold",
                  label: "paypal",
                }}
                createOrder={createOrder}
                onApprove={onApprove}
              />
            </div>
          </div>
        </div>
      </PayPalScriptProvider>
    </div>
  );

}