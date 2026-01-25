"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Cookie, Settings, X } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
          >
            <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl shadow-primary/10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Utilizamos Cookies</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Usamos cookies para mejorar tu experiencia, analizar nuestro tráfico y personalizar contenido.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={acceptAll}
                  className="w-full gradient-ia-bg text-white border-0"
                >
                  Aceptar Todas
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={acceptNecessary}
                    variant="outline"
                    className="flex-1"
                  >
                    Solo Necesarias
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Settings Modal */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Cookie className="w-6 h-6 text-primary" />
              Configuración de Cookies
            </DialogTitle>
            <DialogDescription>
              Personaliza tus preferencias de cookies. Las cookies necesarias siempre están activas.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necesarias */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/50">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-base font-semibold">Cookies Necesarias</Label>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    Siempre activas
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Esenciales para el funcionamiento del sitio. Incluyen navegación, acceso a áreas seguras y funcionalidades básicas.
                </p>
              </div>
              <Switch
                checked={preferences.necessary}
                disabled
                className="mt-1"
              />
            </div>

            {/* Analytics */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-card border border-border/50">
              <div className="flex-1">
                <Label htmlFor="analytics" className="text-base font-semibold mb-2 block cursor-pointer">
                  Cookies Analíticas
                </Label>
                <p className="text-sm text-muted-foreground">
                  Nos ayudan a entender cómo interactúas con nuestro sitio mediante la recopilación de información anónima.
                </p>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked })
                }
                className="mt-1"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-card border border-border/50">
              <div className="flex-1">
                <Label htmlFor="marketing" className="text-base font-semibold mb-2 block cursor-pointer">
                  Cookies de Marketing
                </Label>
                <p className="text-sm text-muted-foreground">
                  Utilizadas para rastrear visitantes y mostrar anuncios relevantes y atractivos para el usuario individual.
                </p>
              </div>
              <Switch
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked })
                }
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={saveCustom}
              className="flex-1 gradient-ia-bg text-white border-0"
            >
              Guardar Preferencias
            </Button>
            <Button
              onClick={() => setShowSettings(false)}
              variant="outline"
            >
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
