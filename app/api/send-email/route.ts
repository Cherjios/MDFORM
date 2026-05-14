import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { pdfBase64, firstName, lastName } = await request.json();

    // Verification check
    if (!pdfBase64) {
      return Response.json({ error: "No PDF data received" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'czamoradental@gmail.com',
      subject: `New Signed Form: ${firstName} ${lastName}`,
      html: `<p>Please find the attached signed document for <strong>${firstName} ${lastName}</strong>.</p>`,
      attachments: [
        {
          filename: `${firstName}_${lastName}_Intake.pdf`,
          content: pdfBase64, // Fixed: removed 'body.' prefix
          contentType: 'application/pdf',
        },
      ],
    });

    return Response.json(data);
  } catch (error: any) {
    console.error("Resend Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY)

// export async function POST(request: Request) {
//   const { pdfBase64, firstName, lastName } = await request.json();

//   try {
//     const data = await resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to: 'czamoradental@gmail.com',
//       subject: `New Signed Form: ${firstName} ${lastName}`,
//       html: `<p>Please find the attached signed document for <strong>${firstName} ${lastName}</strong>.</p>`,
//       attachments: [
//         {
//           filename: `${firstName}_${lastName}_Intake.pdf`,
//           content: body.pdfBase64, // Remove the data:application/pdf;base64 prefix
//         },
//       ],
//     });

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error });
//   }
// }