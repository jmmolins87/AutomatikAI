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
import { animations, spacing } from '@/lib/design-system';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const NetworkGrid = dynamic(
  () => import('@/components/3d/NetworkGrid').then(mod => ({ default: mod.NetworkGrid })),
  { ssr: false }
);

export function Contact() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateField = (field: 'name' | 'email' | 'message') => {
    const newErrors = { ...errors };

    if (field === 'name' && formData.name.trim().length > 0 && formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (field === 'name') {
      newErrors.name = '';
    }

    if (field === 'email' && formData.email.trim().length > 0 && !validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    } else if (field === 'email') {
      newErrors.email = '';
    }

    if (field === 'message' && formData.message.trim().length > 0 && formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    } else if (field === 'message') {
      newErrors.message = '';
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: '',
    };

    if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      validateEmail(formData.email) &&
      formData.message.trim().length >= 10
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
      setErrors({
        name: '',
        email: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <section
      id="contacto"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ paddingTop: spacing.section.md, paddingBottom: spacing.section.md }}
    >
      {/* Three.js Network Grid Background */}
      <NetworkGrid />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: animations.durations.normal }}
          className="text-center mb-16 backdrop-blur-md bg-background/30 rounded-2xl p-8 border border-border/30"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <AnimatedText variant="wave" delay={200}>
              {t('title')}
            </AnimatedText>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <GlowCard
            glowColor="gradient"
            className={`backdrop-blur-md bg-card/60 border-2 transition-all duration-300 ${
              hasFocus ? 'border-primary/70 shadow-lg shadow-primary/20' : ''
            }`}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
                {/* Nombre y Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      {t('form.name')} *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      onFocus={() => setHasFocus(true)}
                      onBlur={() => {
                        setHasFocus(false);
                        validateField('name');
                      }}
                      required
                      className={`w-full ${errors.name ? 'border-destructive' : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      {t('form.email')} *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="juan@empresa.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      onFocus={() => setHasFocus(true)}
                      onBlur={() => {
                        setHasFocus(false);
                        validateField('email');
                      }}
                      required
                      className={`w-full ${errors.email ? 'border-destructive' : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Empresa y Servicio */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      {t('form.company')}
                    </label>
                    <Input
                      id="company"
                      type="text"
                      placeholder={t('form.company')}
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      onFocus={() => setHasFocus(true)}
                      onBlur={() => setHasFocus(false)}
                      className="w-full"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      {t('form.service')}
                    </label>
                    <Input
                      id="service"
                      type="text"
                      placeholder="Ej: Automatización IA, Marketing Digital..."
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      onFocus={() => setHasFocus(true)}
                      onBlur={() => setHasFocus(false)}
                      className="w-full"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    {t('form.message')} *
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t('form.messagePlaceholder')}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => {
                      setHasFocus(false);
                      validateField('message');
                    }}
                    required
                    className={`w-full min-h-[150px] resize-none ${errors.message ? 'border-destructive' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-start md:justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || !isFormValid()}
                    className="w-full md:w-auto gradient-ia-bg text-white border-0 text-base h-12 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 size-5 animate-spin" />
                        {t('form.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 size-5" />
                        {t('form.submit')}
                      </>
                    )}
                  </Button>
                </div>
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
                  {t('form.success.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('form.success.description')}
                </p>
              </motion.div>
            )}
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
