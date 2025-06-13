import { NonRetriableError } from "inngest";
import User from "../../models/user.js";
import { inngest } from "../client.js";
import { sendMail } from "../../utils/mailer.js";

export const onUserSignUp = inngest.createFunction(
    {id:"on-user-signup",retries:2},
    {event:"user/signup"},
    async ({event,step}) => {
        try {
            const {email} = event.data;
        const user = await step.run("get-user-email", async () => {
                const userObject = await User.findOne({email});
                if(!userObject){
                    throw new NonRetriableError("User no longer exist in our database")
                }
                return userObject
            }) ;
            await step.run("send-welcome-mail",async ()=>{
                const subject = `Welcome to the app`

                const message = `Hii,
                  \n\n

                  Thanks for signingup we are glad to have you
                  onboard!
                `
             await sendMail(user.email,subject,message);
            })
            return {success:true}
        } catch (error) {
            console.log("Error running steps",error.message);
            return {success:false,error: error.message}
        }
    }
)