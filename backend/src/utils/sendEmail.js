import {Resend} from "resend";
import {render} from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async({to, subject, react}) => {
         try{
            const html = render(react);

            await resend.emails.send({
                from: "Token_Mitra <onboarding@resend.dev>"
,
                to,
                subject,
                html,
            });

            console.log("Email sent to:", to);

        }catch (err) {
            console.log("Email sending failed!", err);
        }


    }


