"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GlowCard } from '@/components/effects/GlowCard';
import { AnimatedText } from '@/components/effects/AnimatedText';
import { animations, spacing } from '@/lib/design-system';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'sonner';

const NetworkGrid = dynamic(
  () => import('@/components/3d/NetworkGrid').then(mod => ({ default: mod.NetworkGrid })),
  { ssr: false }
);

export function Contact() {
  const t = useTranslations('contact');
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateField = useCallback((field: 'name' | 'email' | 'message', isTouched: boolean = false) => {
    const newErrors = { ...errors };
    const fieldTouched = isTouched || touched[field];

    if (field === 'name') {
      if (fieldTouched && formData.name.trim().length === 0) {
        newErrors.name = t('form.errors.required');
      } else if (formData.name.trim().length > 0 && formData.name.trim().length < 2) {
        newErrors.name = t('form.errors.nameMin');
      } else {
        newErrors.name = '';
      }
    }

    if (field === 'email') {
      if (fieldTouched && formData.email.trim().length === 0) {
        newErrors.email = t('form.errors.required');
      } else if (formData.email.trim().length > 0 && !validateEmail(formData.email)) {
        newErrors.email = t('form.errors.emailFormat');
      } else {
        newErrors.email = '';
      }
    }

    if (field === 'message') {
      if (fieldTouched && formData.message.trim().length === 0) {
        newErrors.message = t('form.errors.required');
      } else if (formData.message.trim().length > 0 && formData.message.trim().length < 10) {
        newErrors.message = t('form.errors.messageMin');
      } else {
        newErrors.message = '';
      }
    }

    setErrors(newErrors);
  }, [errors, touched, formData, t]);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: '',
    };

    if (formData.name.trim().length === 0) {
      newErrors.name = t('form.errors.required');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('form.errors.nameMin');
    }

    if (formData.email.trim().length === 0) {
      newErrors.email = t('form.errors.required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('form.errors.emailFormat');
    }

    if (formData.message.trim().length === 0) {
      newErrors.message = t('form.errors.required');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('form.errors.messageMin');
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

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    if (!validateForm()) {
      return;
    }

    if (!executeRecaptcha) {
      toast.error(t('form.toast.error'), {
        description: 'reCAPTCHA no disponible. Intenta de nuevo.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA v3
      const recaptchaToken = await executeRecaptcha('submit_contact_form');

      // TODO: Implementar envío real del formulario con recaptchaToken
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success toast
      toast.success(t('form.toast.success'), {
        description: t('form.toast.successDescription'),
      });

      // Reset form
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
      setTouched({
        name: false,
        email: false,
        message: false,
      });
    } catch (error) {
      toast.error(t('form.toast.error'), {
        description: t('form.toast.errorDescription'),
      });
    } finally {
      setIsSubmitting(false);
    }
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
          viewport={{ once: false, margin: '-100px' }}
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
                      if (touched.name) validateField('name');
                    }}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => {
                      setHasFocus(false);
                      setTouched({ ...touched, name: true });
                      validateField('name', true);
                    }}
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
                      if (touched.email) validateField('email');
                    }}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => {
                      setHasFocus(false);
                      setTouched({ ...touched, email: true });
                      validateField('email', true);
                    }}
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
                    if (touched.message) validateField('message');
                  }}
                  onFocus={() => setHasFocus(true)}
                  onBlur={() => {
                    setHasFocus(false);
                    setTouched({ ...touched, message: true });
                    validateField('message', true);
                  }}
                  className={`w-full min-h-[150px] resize-none ${errors.message ? 'border-destructive' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-xs text-destructive mt-1">{errors.message}</p>
                )}
              </div>

              {/* ...existing code... */}

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
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
