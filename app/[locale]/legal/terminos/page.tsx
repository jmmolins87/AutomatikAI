"use client";

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TerminosPage() {
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
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Términos y Condiciones
              </h1>
              <p className="text-muted-foreground">Última actualización: Enero 2026</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Aceptación de los Términos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Al acceder y utilizar el sitio web de jmarIA Agency, aceptas estar sujeto a estos
                términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos,
                no debes utilizar nuestro sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Servicios</h2>
              <p className="text-muted-foreground leading-relaxed">
                jmarIA Agency ofrece servicios de marketing digital, automatización con IA, y consultoría.
                Los términos específicos de cada servicio se acordarán mediante contratos individuales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Propiedad Intelectual</h2>
              <p className="text-muted-foreground leading-relaxed">
                Todo el contenido, diseño, gráficos, código y demás elementos del sitio son propiedad
                de jmarIA Agency y están protegidos por leyes de propiedad intelectual.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Uso Aceptable</h2>
              <p className="text-muted-foreground leading-relaxed">
                Te comprometes a utilizar nuestro sitio web de manera legal y respetuosa. No debes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Usar el sitio para actividades ilegales</li>
                <li>Intentar acceder a áreas restringidas</li>
                <li>Interferir con el funcionamiento del sitio</li>
                <li>Recopilar datos de otros usuarios sin consentimiento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Limitación de Responsabilidad</h2>
              <p className="text-muted-foreground leading-relaxed">
                jmarIA Agency no será responsable por daños indirectos, incidentales o consecuentes
                que resulten del uso o la imposibilidad de usar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Modificaciones</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nos reservamos el derecho de modificar estos términos en cualquier momento.
                Las modificaciones entrarán en vigor inmediatamente después de su publicación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Contacto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para consultas sobre estos términos, contáctanos en:{' '}
                <a href="mailto:legal@jmaria.agency" className="text-primary hover:underline">
                  legal@jmaria.agency
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
