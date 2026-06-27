import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardFooter, Button } from "@heroui/react";
import Link from 'next/link';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const {
    status,
    customer_details
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const customerEmail = customer_details?.email || "your email";

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-[#111115] text-gray-100 p-6 flex items-center justify-center">
        <Card className="max-w-md w-full bg-[#16161a] border border-purple-500/30 p-8 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.15)] text-center">
          
          <CardHeader className="flex flex-col items-center justify-center p-0 mb-6">
            <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/40 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-3xl font-black mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)] animate-pulse">
              ✓
            </div>
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 uppercase tracking-wider">
              Payment Successful
            </h1>
            <p className="text-xs text-gray-500 mt-1">Thank you for your purchase!</p>
          </CardHeader>

          <div className="space-y-4 mb-8 text-sm text-gray-400 bg-gray-900/40 p-5 rounded-xl border border-gray-800/60 leading-relaxed">
            <p>
              We appreciate your business! A confirmation email and your digital invoice will be sent to{' '}
              <span className="text-pink-400 font-semibold break-all">{customerEmail}</span>.
            </p>
            <p className="text-xs text-gray-500 pt-2 border-t border-gray-800/60">
              If you have any questions or need support, please contact{' '}
              <a 
                href="mailto:orders@example.com" 
                className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2 font-medium"
              >
                orders@example.com
              </a>.
            </p>
          </div>

          <CardFooter className="p-0 flex flex-col gap-3">
            <Link href="/browse" className="w-full">
              <Button className="w-full font-bold text-sm tracking-wider uppercase py-5 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:brightness-110 transition-all">
                Explore More Art 🎨
              </Button>
            </Link>
            
            <Link 
              href="/dashboard/user"
              className="text-xs text-gray-500 hover:text-gray-400 transition-colors uppercase tracking-wider font-semibold py-2"
            >
              Go to Dashboard
            </Link>
          </CardFooter>

        </Card>
      </div>
    );
  }
}