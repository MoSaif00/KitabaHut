// app/api/webhook/route.ts
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import prisma from '@/app/utils/db';
 
export async function POST(req: Request) {
  try {
    // Get the headers - await the headers() call
    const headersList = await headers();
    const svix_id = headersList.get("svix-id");
    const svix_timestamp = headersList.get("svix-timestamp");
    const svix_signature = headersList.get("svix-signature");
 
    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
        status: 400
      });
    }
 
    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);
 
    // Create a new SVIX instance with your webhook secret
    const wh = new Webhook(process.env.WEBHOOK_SECRET || '');
 
    let evt: WebhookEvent;
 
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new Response('Error occured', {
        status: 400
      });
    }
 
    // Handle the webhook
    const eventType = evt.type;
 
    if (eventType === 'user.created' ) {

      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      
       await prisma.user.create({
          data: {
            id: id as string,
            email: email_addresses[0]?.email_address,
            firstName: first_name || '',
            lastName: last_name || '',
            profileImage: image_url || `https://avatar.vercel.sh/${first_name}`,
          },
        });
           
    }
    if (eventType === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      
       await prisma.user.update({
        where: { id: id as string },
        data: {
          email: email_addresses[0]?.email_address,
          firstName: first_name || '',
          lastName: last_name || '',
          profileImage: image_url || `https://avatar.vercel.sh/${first_name}`,
        },
      });
    }
 
    return new Response('', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Webhook error occurred', { status: 500 });
  }
}