import OrderSummary from "./Checkout";

export default async function page({params}) {
    const data=await params.orderId;
    console.log(data)

  return (
    <div>
     <OrderSummary orderId={data}/>
    </div>
  )
}
