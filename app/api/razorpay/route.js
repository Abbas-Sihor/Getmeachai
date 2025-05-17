import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/Connectdb";
import User from "@/models/User";

export const POST = async(req)=>{
   try {
    await connectDb()
    // Parse the incoming JSON body
    let body = await req.formData(); // Parse the incoming body as JSON
    body=Object.fromEntries(body)
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    
    let p = await Payment.findOne({oid:razorpay_order_id})
    const user = await User.findOne({username:p.to_user})
    if(!p){
      return NextResponse.json({ message: "Payment Oredr Id Not Found" }, { status: 400 });
    }
    let xx = validatePaymentVerification({"order_id":razorpay_order_id, "payment_id": razorpay_payment_id}, razorpay_signature, user.razorpaysecret)

    if(xx){
      const updatepayment = await Payment.findOneAndUpdate({oid:razorpay_order_id},{done:true},{new:true})
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatepayment.to_user}?paymentdone=true`)
    }
    else{
      return NextResponse.json({ message: "Payment verification failed" }, { status: 400 });
    }
   } catch (error) {
    console.error("Error during payment verification:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
   }
    

}