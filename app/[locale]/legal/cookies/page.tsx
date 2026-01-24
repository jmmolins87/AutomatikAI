"use client";

import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';

export default function CookiesPage() {
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
              <Cookie className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Política de Cookies
              </h1>
              <p className="text-muted-foreground">Última actualización: Enero 2026</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">¿Qué son las Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando
                visitas un sitio web. Nos ayudan a mejorar tu experiencia y proporcionar funcionalidades esenciales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Tipos de Cookies que Utilizamos</h2>

              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
                  <h3 className="text-xl font-bold mb-3">Cookies Necesarias</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Esenciales para el funcionamiento del sitio. Sin ellas, algunas funcionalidades
                    no estarían disponibles. Estas cookies no se pueden desactivar.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
                  <h3 className="text-xl font-bold mb-3">Cookies Analíticas</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web mediante
                    la recopilación de información de forma anónima. Esto nos permite mejorar continuamente
                    la experiencia del usuario.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
                  <h3 className="text-xl font-bold mb-3">Cookies de Marketing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Se utilizan para rastrear a los visitantes en los sitios web. La intención es mostrar
                    anuncios relevantes y atractivos para el usuario individual, y por lo tanto, más valiosos
                    para los editores y terceros anunciantes.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Gestionar tus Preferencias</h2>
              <p className="text-muted-foreground leading-relaxed">
                Puedes configurar tus preferencias de cookies en cualquier momento a través del banner
                de cookies que aparece en tu primera visita. También puedes gestionar las cookies desde
                la configuración de tu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies de Terceros</h2>
              <p className="text-muted-foreground leading-relaxed">
                Algunos de nuestros socios pueden establecer cookies en tu dispositivo cuando visitas
                nuestro sitio. Esto incluye servicios de análisis como Google Analytics y plataformas
                de marketing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contacto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si tienes preguntas sobre nuestra política de cookies, contáctanos en:{' '}
                <a href="mailto:cookies@jmaria.agency" className="text-primary hover:underline">
                  cookies@jmaria.agency
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
