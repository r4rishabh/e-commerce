import React from 'react'

const CheckoutSuccess = () => {
    return (
        <div>
            <script>{
                alert("Payment Success!")
            }</script>
            {window.location.href = "/cart"}

        </div>
    )
}

export default CheckoutSuccess
