"use client";
import React, { useState } from "react";
import type { Locale } from "@/lib/i18n-config";

interface DonateOption {
    value: string;
    label: string;
}

export interface QuickDonateData {
    title: string;
    donation_type_label: string;
    contact_label: string;
    contact_placeholder: string;
    amount_label: string;
    amount_placeholder: string;
    button: string;
    required: string;
    validation_message: string;
    tax_text: string;
    tax_link_text: string;
    options: DonateOption[];
}

interface DonateProps {
    lang: Locale;
    dictionary: QuickDonateData;
}

export default function Donate({ lang: _lang, dictionary }: DonateProps) {
    const [donationType, setDonationType] = useState(dictionary.options[0]?.value || "fund");
    const [contact, setContact] = useState("");
    const [amount, setAmount] = useState("");

    return (
        <div className="w-full relative z-20">
            <div className="mx-auto max-w-6xl z-20 px-4 sm:px-6 lg:px-8">
                <div className="relative -mt-10 md:-mt-20">
                    <div className="rounded-2xl bg-red-200 p-6 sm:p-8 shadow-md">
                        <h2 className="mb-4 text-center text-2xl sm:text-3xl font-bold text-primary">{dictionary.title}</h2>
                        <form className="flex flex-col gap-4 md:flex-row md:items-end">
                            <div className="md:flex-1">
                                <label className="mb-2 block text-sm font-medium text-gray-700">{dictionary.donation_type_label} <span className="text-red-600">{dictionary.required}</span></label>
                                <select
                                    value={donationType}
                                    onChange={(e) => setDonationType(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
                                >
                                    {dictionary.options.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:flex-1">
                                <label className="mb-2 block text-sm font-medium text-gray-700">{dictionary.contact_label} <span className="text-red-600">{dictionary.required}</span></label>
                                <input
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    placeholder={dictionary.contact_placeholder}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
                                />
                            </div>

                            <div className="md:flex-1">
                                <label className="mb-2 block text-sm font-medium text-gray-700">{dictionary.amount_label} <span className="text-red-600">{dictionary.required}</span></label>
                                <input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder={dictionary.amount_placeholder}
                                    inputMode="numeric"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
                                />
                            </div>

                            <button
                                type="button"
                                className="rounded-lg bg-emerald-700 px-6 py-3 text-white shadow hover:brightness-95"
                                onClick={() => {
                                    if (!contact || !amount) {
                                        alert(dictionary.validation_message);
                                        return;
                                    }
                                    alert(`Donating ${amount} (${donationType}) — contact: ${contact}`);
                                }}
                            >
                                {dictionary.button}
                            </button>
                        </form>
                        <p className="mt-6 text-center text-sm text-gray-800">
                            {dictionary.tax_text} <a className="font-medium text-emerald-700" href="#">{dictionary.tax_link_text}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
