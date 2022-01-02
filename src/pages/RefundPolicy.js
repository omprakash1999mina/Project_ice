import React from 'react';

export const RefundPolicy = () => {
    window.scrollTo(0,0);
    return (
        <div className="m-4 pt-10 sm:h-screen">
            <headline className="my-6 mt-10 text-3xl sm:text-6xl font-semibold font-serif rounded-lg border shadow-lg border-gray-200 flex  justify-center">
                <h1 className="m-2 sm:m-4">Order Cancellation and Refund Policy</h1>
            </headline>
            <h2 className="flex justify-start text-sm ">Last updated on jully 18, 2021</h2>
            <p>
                <ul className="list-outside m-6 list-decimal">
                    <li className="m-4">
                        You acknowledge that 
                        (1) your cancellation, or attempted or purported cancellation of an Order or 
                        (2) cancellation due to reasons not attributable to OP-Developers, that is, in the event you provide incorrect particulars, contact number, delivery address etc., or that you were unresponsive, not reachable or unavailable for fulfillment of the services offered to you, shall amount to breach of your unconditional and irrevocable authorization in favour of OP-Developers to place that Order against the Restaurant Partners/Store(s) on your behalf ( <h2 className="font-bold inline"> “Authorization Breach" </h2> ). In the event you commit an Authorization Breach, you shall be liable to pay the liquidated damages of an amount equivalent to the Order Value. You hereby authorize OP-Developers to deduct or collect the amount payable as liquidated damages through such means as OP-Developers may determine in its discretion, including without limitation, by deducting such amount from any payment made towards your next Order
                    </li>
                    <li className="m-4">
                        There may be cases where OP-Developers is either unable to accept your order or cancels the order, due to reasons including without limitation, technical errors, unavailability of the item(s) ordered, or any other reason attributable to OP-Developers, Restaurant Partner/Store or Delivery Partner. In such cases, OP-Developers shall not charge a cancellation charge from you. If the order is cancelled after payment has been charged and you are eligible for a refund of the Order Value or any part thereof, the said amount will be reversed to you.
                    </li>
                    <li className="m-4">
                    No replacement / refund / or any other resolution will be provided without Restaurant Partner’s/Store(s)’ permission.
                    </li>
                    <li className="m-4">
                    Any complaint, with respect to the Order which shall include instances but not be limited to food spillage, foreign objects in food, delivery of the wrong order or food and beverages or Products, poor quality, You will be required to share the proof of the same before any resolution can be provided.
                    </li>
                    <li className="m-4">
                    You shall not be entitled to a refund in case instructions placed along with the Order are not followed in the form and manner You had intended. Instructions are followed by the Restaurant Partner /Store on a best-efforts basis.
                    </li>
                    <li className="m-4">
                    All refunds shall be processed in the same manner as they are received, unless refunds have been provided to You in the form of credits, refund amount will reflect in your account based on respective banks policies.
                    </li>
                    
                </ul>
            </p>
        </div>
    )
}
