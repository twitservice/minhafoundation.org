"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export interface VolunteerApplicationFormDictionary {
  title: string;
  name_label: string;
  name_placeholder: string;
  email_label: string;
  email_placeholder: string;
  phone_label: string;
  phone_placeholder: string;
  interest_label: string;
  interest_placeholder: string;
  interest_options: string[];
  message_label: string;
  message_placeholder: string;
  note: string;
  button: string;
  captcha_label: string;
  captcha_required_message: string;
  captcha_missing_site_key: string;
}

interface VolunteerApplicationFormProps {
  form: VolunteerApplicationFormDictionary;
}

const turnstileScriptId = "cf-turnstile-script";

export default function VolunteerApplicationForm({ form }: VolunteerApplicationFormProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!siteKey || !widgetRef.current) {
      return;
    }

    const renderWidget = () => {
      if (!window.turnstile || !widgetRef.current || widgetIdRef.current) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: siteKey,
        callback: (newToken: string) => {
          setToken(newToken);
          setError("");
        },
        "expired-callback": () => {
          setToken("");
        },
        "error-callback": () => {
          setToken("");
        },
        theme: "light",
      });
    };

    const existingScript = document.getElementById(turnstileScriptId) as HTMLScriptElement | null;
    if (existingScript) {
      if (window.turnstile) {
        renderWidget();
      } else {
        existingScript.addEventListener("load", renderWidget, { once: true });
      }
    } else {
      const script = document.createElement("script");
      script.id = turnstileScriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!siteKey || token) {
      return;
    }

    event.preventDefault();
    setError(form.captcha_required_message);
  };

  return (
    <form className="mt-6 space-y-4" action="#" method="post" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="name">
          {form.name_label}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder={form.name_placeholder}
          className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-primary placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="email">
          {form.email_label}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder={form.email_placeholder}
          className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-primary placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="phone">
          {form.phone_label}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder={form.phone_placeholder}
          className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-primary placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="interest">
          {form.interest_label}
        </label>
        <select
          id="interest"
          name="interest"
          className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-primary focus:border-green-600 focus:outline-none"
          defaultValue=""
          required
        >
          <option value="" disabled>
            {form.interest_placeholder}
          </option>
          {form.interest_options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="message">
          {form.message_label}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={form.message_placeholder}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-primary placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
          required
        />
      </div>

      <div>
        <p className="mb-2 block text-sm font-semibold text-primary">{form.captcha_label}</p>
        {siteKey ? (
          <>
            <div ref={widgetRef} />
            <input type="hidden" name="cf-turnstile-response" value={token} readOnly />
          </>
        ) : (
          <p className="text-xs text-rose-600">{form.captcha_missing_site_key}</p>
        )}
      </div>

      <p className="text-xs text-secondary-text">{form.note}</p>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}

      <button
        type="submit"
        className="inline-flex h-11 items-center gap-2 rounded-lg bg-green-700 px-5 text-sm font-semibold text-white transition hover:bg-green-800"
      >
        <span>{form.button}</span>
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}