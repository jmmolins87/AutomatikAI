"use client";

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacidadPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Política de Privacidad
              </h1>
              <p className="text-muted-foreground">Última actualización: Enero 2026</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Información que Recopilamos</h2>
              <p className="text-muted-foreground leading-relaxed">
                En jmarIA Agency, recopilamos información que nos proporcionas directamente cuando:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Completas formularios de contacto</li>
                <li>Te suscribes a nuestros servicios</li>
                <li>Nos contactas por email o teléfono</li>
                <li>Interactúas con nuestro sitio web</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Uso de la Información</h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Comunicarnos contigo sobre consultas y proyectos</li>
                <li>Enviar información relevante sobre nuestros servicios</li>
                <li>Analizar el uso del sitio y mejorar la experiencia del usuario</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Protección de Datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales
                contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Tus Derechos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Acceder a tus datos personales</li>
                <li>Rectificar información inexacta</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Solicitar la portabilidad de tus datos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Contacto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para cualquier consulta sobre esta política de privacidad, puedes contactarnos en:{' '}
                <a href="mailto:privacy@jmaria.agency" className="text-primary hover:underline">
                  privacy@jmaria.agency
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
