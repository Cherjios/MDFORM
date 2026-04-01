import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)
export async function POST(request: Request) {
  const { pdfBase64, firstName, lastName } = await request.json();

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'czamoradental@gmail.com',
      subject: `New Signed Form: ${firstName} ${lastName}`,
      html: `<p>Please find the attached signed document for <strong>${firstName} ${lastName}</strong>.</p>`,
      attachments: [
        {
          filename: 'submission.pdf',
          content: pdfBase64.split(',')[1], // Remove the data:application/pdf;base64 prefix
        },
      ],
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}