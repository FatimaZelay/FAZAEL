import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  let name, email, message;

  try {
    const body = await request.json();
    name = body.name;
    email = body.email;
    message = body.message;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'fazael.contact@gmail.com',
    subject: `New message from ${name}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`
  });

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
};