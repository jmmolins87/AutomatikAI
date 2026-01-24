"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { GlowCard } from '@/components/effects/GlowCard';
import { AnimatedText } from '@/components/effects/AnimatedText';
import { P5Canvas } from '@/components/interactive/P5Canvas';
import { animations, spacing } from '@/lib/design-system';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de envío
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset después de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <section
      id="contacto"
      className="relative py-20 md:py-32"
      style={{ paddingTop: spacing.section.md, paddingBottom: spacing.section.md }}
    >
      {/* P5.js Background */}
      <P5Canvas variant="generative" className="opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: animations.durations.normal }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <AnimatedText variant="wave" delay={200}>
              Hablemos de tu Proyecto
            </AnimatedText>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos listos para transformar tu visión en realidad. Cuéntanos sobre tu
            proyecto y descubre cómo podemos ayudarte.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <GlowCard glowColor="gradient">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Nombre completo *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan@empresa.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Empresa */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Empresa
                  </label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Nombre de tu empresa"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Servicio */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Servicio de interés
                  </label>
                  <Input
                    id="service"
                    type="text"
                    placeholder="Ej: Automatización IA, Marketing Digital..."
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Cuéntanos sobre tu proyecto *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Describe brevemente tu proyecto, objetivos y cómo podemos ayudarte..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="w-full min-h-[150px] resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full gradient-ia-bg text-white border-0 text-base h-12"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 size-5" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: animations.durations.fast }}
                className="p-12 text-center"
              >
                <div className="w-20 h-20 rounded-full gradient-ia-bg flex items-center justify-center mx-auto mb-6">
                  <Check className="size-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  ¡Mensaje Enviado!
                </h3>
                <p className="text-muted-foreground">
                  Gracias por contactarnos. Nos pondremos en contacto contigo muy pronto.
                </p>
              </motion.div>
            )}
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
