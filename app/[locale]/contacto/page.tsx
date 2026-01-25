"use client";

import { Contact } from '@/components/sections/Contact';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function ContactoPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
      language="es"
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'body',
      }}
    >
      <div className="pt-20 min-h-screen">
        <Contact />
      </div>
    </GoogleReCaptchaProvider>
  );
}
