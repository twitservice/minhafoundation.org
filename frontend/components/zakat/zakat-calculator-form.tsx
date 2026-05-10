"use client";

import { useEffect, useMemo, useState } from "react";

interface FieldText {
  label: string;
  placeholder: string;
}

interface ZakatFields {
  cash: FieldText;
  bank_balance: FieldText;
  gold_value: FieldText;
  silver_value: FieldText;
  investments: FieldText;
  business_assets: FieldText;
  receivables: FieldText;
  liabilities: FieldText;
  nisab_threshold: FieldText;
}

interface ButtonText {
  calculate: string;
  save: string;
  reset: string;
  print: string;
}

interface ResultText {
  title: string;
  total_assets: string;
  total_liabilities: string;
  net_assets: string;
  nisab_threshold: string;
  zakat_due: string;
  status_met: string;
  status_not_met: string;
}

interface MessageText {
  save_confirm: string;
  save_success: string;
  save_cancelled: string;
  loaded_saved_data: string;
}

export interface ZakatCalculatorDictionary {
  form_title: string;
  form_description: string;
  rate_label: string;
  currency_symbol: string;
  fields: ZakatFields;
  buttons: ButtonText;
  result: ResultText;
  messages: MessageText;
}

interface ZakatCalculatorFormProps {
  locale: string;
  dictionary: ZakatCalculatorDictionary;
}

interface FormValues {
  cash: string;
  bank_balance: string;
  gold_value: string;
  silver_value: string;
  investments: string;
  business_assets: string;
  receivables: string;
  liabilities: string;
  nisab_threshold: string;
}

interface CalculationResult {
  totalAssets: number;
  totalLiabilities: number;
  netAssets: number;
  nisabThreshold: number;
  zakatDue: number;
  isEligible: boolean;
}

const defaultFormValues: FormValues = {
  cash: "",
  bank_balance: "",
  gold_value: "",
  silver_value: "",
  investments: "",
  business_assets: "",
  receivables: "",
  liabilities: "",
  nisab_threshold: "70000",
};

function toNumber(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value: number): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function ZakatCalculatorForm({ locale, dictionary }: ZakatCalculatorFormProps) {
  const storageKey = useMemo(() => `minha:zakat-calculator:${locale}`, [locale]);

  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const savedRaw = window.localStorage.getItem(storageKey);
    if (!savedRaw) {
      return;
    }

    try {
      const savedData = JSON.parse(savedRaw) as {
        formValues?: FormValues;
        result?: CalculationResult;
        savedAt?: string;
      };

      if (savedData.formValues) {
        setFormValues({ ...defaultFormValues, ...savedData.formValues });
      }

      if (savedData.result) {
        setResult(savedData.result);
      }

      if (savedData.savedAt) {
        setSavedAt(savedData.savedAt);
      }

      setStatusMessage(dictionary.messages.loaded_saved_data);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [dictionary.messages.loaded_saved_data, storageKey]);

  const handleChange = (key: keyof FormValues, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const calculateZakat = () => {
    const totalAssets =
      toNumber(formValues.cash) +
      toNumber(formValues.bank_balance) +
      toNumber(formValues.gold_value) +
      toNumber(formValues.silver_value) +
      toNumber(formValues.investments) +
      toNumber(formValues.business_assets) +
      toNumber(formValues.receivables);

    const totalLiabilities = toNumber(formValues.liabilities);
    const netAssets = Math.max(totalAssets - totalLiabilities, 0);
    const nisabThreshold = toNumber(formValues.nisab_threshold);
    const isEligible = netAssets >= nisabThreshold;
    const zakatDue = isEligible ? netAssets * 0.025 : 0;

    setResult({
      totalAssets,
      totalLiabilities,
      netAssets,
      nisabThreshold,
      zakatDue,
      isEligible,
    });

    setStatusMessage("");
  };

  const saveToLocalStorage = () => {
    const shouldSave = window.confirm(dictionary.messages.save_confirm);
    if (!shouldSave) {
      setStatusMessage(dictionary.messages.save_cancelled);
      return;
    }

    const payload = {
      formValues,
      result,
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(storageKey, JSON.stringify(payload));
    setSavedAt(payload.savedAt);
    setStatusMessage(dictionary.messages.save_success);
  };

  const resetForm = () => {
    setFormValues(defaultFormValues);
    setResult(null);
    setStatusMessage("");
  };

  const fieldOrder: Array<keyof Omit<FormValues, "nisab_threshold">> = [
    "cash",
    "bank_balance",
    "gold_value",
    "silver_value",
    "investments",
    "business_assets",
    "receivables",
    "liabilities",
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-primary">{dictionary.form_title}</h2>
      <p className="mt-2 text-secondary-text">{dictionary.form_description}</p>
      <p className="mt-2 text-sm font-medium text-primary">{dictionary.rate_label}: 2.5%</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fieldOrder.map((fieldKey) => (
          <div key={fieldKey}>
            <label className="mb-2 block text-sm font-semibold text-primary" htmlFor={fieldKey}>
              {dictionary.fields[fieldKey].label}
            </label>
            <input
              id={fieldKey}
              type="number"
              min="0"
              step="any"
              value={formValues[fieldKey]}
              onChange={(event) => handleChange(fieldKey, event.target.value)}
              placeholder={dictionary.fields[fieldKey].placeholder}
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-primary placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="nisab_threshold">
            {dictionary.fields.nisab_threshold.label}
          </label>
          <input
            id="nisab_threshold"
            type="number"
            min="0"
            step="any"
            value={formValues.nisab_threshold}
            onChange={(event) => handleChange("nisab_threshold", event.target.value)}
            placeholder={dictionary.fields.nisab_threshold.placeholder}
            className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-primary placeholder:text-gray-400 focus:border-green-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={calculateZakat}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-green-700 px-5 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          {dictionary.buttons.calculate}
        </button>
        <button
          type="button"
          onClick={saveToLocalStorage}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-green-700 px-5 text-sm font-semibold text-green-700 transition hover:bg-green-50"
        >
          {dictionary.buttons.save}
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 px-5 text-sm font-semibold text-primary transition hover:bg-gray-50"
        >
          {dictionary.buttons.reset}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          disabled={!result}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 px-5 text-sm font-semibold text-primary transition enabled:hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {dictionary.buttons.print}
        </button>
      </div>

      {statusMessage ? <p className="mt-4 text-sm text-secondary-text">{statusMessage}</p> : null}
      {savedAt ? <p className="mt-1 text-xs text-secondary-text">Saved: {new Date(savedAt).toLocaleString()}</p> : null}

      {result ? (
        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 print:border-0 print:bg-white print:p-0">
          <h3 className="text-xl font-bold text-primary">{dictionary.result.title}</h3>
          <div className="mt-4 space-y-2 text-sm md:text-base">
            <p className="text-secondary-text">
              {dictionary.result.total_assets}: {dictionary.currency_symbol}
              {formatMoney(result.totalAssets)}
            </p>
            <p className="text-secondary-text">
              {dictionary.result.total_liabilities}: {dictionary.currency_symbol}
              {formatMoney(result.totalLiabilities)}
            </p>
            <p className="font-semibold text-primary">
              {dictionary.result.net_assets}: {dictionary.currency_symbol}
              {formatMoney(result.netAssets)}
            </p>
            <p className="text-secondary-text">
              {dictionary.result.nisab_threshold}: {dictionary.currency_symbol}
              {formatMoney(result.nisabThreshold)}
            </p>
            <p className="text-secondary-text">
              {result.isEligible ? dictionary.result.status_met : dictionary.result.status_not_met}
            </p>
            <p className="text-lg font-bold text-green-700">
              {dictionary.result.zakat_due}: {dictionary.currency_symbol}
              {formatMoney(result.zakatDue)}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
