const nodemailer = require('nodemailer')
// Import pwd form form mailer where we can hide our mailbox password

// selecting mail service and authorazing with our credentials
const transport = nodemailer.createTransport({
// you need to enable the less secure option on your gmail account
// https://myaccount.google.com/lesssecureapps?pli=1
        service: 'gmail',
	auth: {
		user: 'alexakip@gmail.com',
		pass: 'qwvvavvxjjniypel'
	},
    tls: {
        rejectUnauthorized: false
    }
});

const send_email = async (req,res) => {
	   const { name , email  } = req.body
	//   const default_subject = 'This is a default subject'
	  const mailOptions = {
            from:'alexakip@gmail.com',
		    to:email,
            subject:'Payment confirmation from petras eshop',
            html:'<h4>Dear M/Ms '+name+'<h4><p>Please be informed your payment was successfully.</p><p>Your order is being processes.</p>'

            //text:
            // html: '<p>'+(subject || default_subject)+ '</p><p><pre>' + message + '</pre></p>'
	   }
      try{
           const res = await transport.sendMail(mailOptions)
           console.log('=========================================> Email sent !!')
           return res.json({on:true,message:'email sent'})
      }
      catch( err ){
           return res.json({ok:false,message:err, request:req.body})
      }
}

module.exports = { send_email }
